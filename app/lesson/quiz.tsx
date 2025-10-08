"use client";

import { challengeOptions, challenges} from "@/db/schema";
import { Header } from "./header";
import { Challenge } from "./challenge";
import { Footer } from "./footer";
import { QuestionBubble } from "./question-bubble";
import { useEffect, useRef, useState, useTransition } from "react";
import { upsertChallengeProgress } from "@/actions/challenge-progress";
import { toast } from "sonner";
import { useAudio, useWindowSize, useMount } from "react-use";
import { loseHearts } from "@/actions/user-progress";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { ResultCard } from "./result-card";
import Confetti from "react-confetti";
import { useHeartsModal } from "@/store/use-hearts-modal";
import { usePracticeModal } from "@/store/use-practice-modal";

type Props = {
    initialPercentage: number;
    initialHearts: number;
    initialLessonId: number;
    initialLessonChallenges: (typeof challenges.$inferSelect & {
        completed: boolean;
        challengeOptions: typeof challengeOptions.$inferSelect[];
    })[];
    isProMember: any;
    activeCourseTitle: string;
};

export const Quiz = ({ initialPercentage, initialHearts, initialLessonId, initialLessonChallenges, isProMember, activeCourseTitle }: Props) => {
    const {open: openHeartsModal} = useHeartsModal();
    const {open: openPracticeModal} = usePracticeModal();

    useMount(() => {
        if (initialPercentage === 100){
            openPracticeModal();
        }
    })

    const router = useRouter();
    const [finishAudio, _f, finishControls] = useAudio({ src: "/sfx/cheer.mp3" });
    const finishPlayedRef = useRef(false);
    const {width, height} = useWindowSize();
    const [isPending, startTransition] = useTransition();
    const [correctAudio, _c, correctControls,] = useAudio({ src: "/sfx/correct.mp3" });
    const [incorrectAudio, _i, incorrectControls,] = useAudio({ src: "/sfx/incorrect.mp3" });
    const [lessonId] = useState(initialLessonId);
    const [hearts, setHearts] = useState(initialHearts);
    const [percentage, setPercentage] = useState(() =>{
        return initialPercentage === 100 ? 0 : initialPercentage;
    });
    const [challenges] = useState(initialLessonChallenges);
    const [activeIndex, setActiveIndex] = useState(() => {
        const incompletedIndex = challenges.findIndex((challenge) => !challenge.completed);
        return incompletedIndex === -1 ? 0 : incompletedIndex;
    });

    const [selectedOption, setSelectedOption] = useState<number>();
    const [fillInput, setFillInput] = useState("");
    const [status, setStatus] = useState<"correct" | "incorrect" | "none">("none");


    const currentChallenge = challenges[activeIndex];

    // If this lesson has no challenges, show a friendly message instead of jumping to results
    if (!challenges || challenges.length === 0) {
        return (
            <>
                <div className="flex flex-col gap-y-4 lg:gap-y-8 max-w-lg mx-auto text-center items-center justify-center h-full">
                    <Image src="/icons/clipboard.png" alt="No challenges yet" className="block lg:hidden" height={100} width={100} />
                    <h1 className="text-xl lg:text-3xl font-bold text-neutral-500">
                        This lesson isn't ready yet
                    </h1>
                    <p className="text-neutral-500">New challenges are coming soon. Pick another lesson for now.</p>
                </div>
                <Footer lessonId={lessonId} status="completed" onCheck={() => router.push("/dashboard")} />
            </>
        );
    }
    const options = currentChallenge?.challengeOptions ?? [];

    const onNext = () => {
        setActiveIndex((current) => current + 1);
    };


    const onSelect = (id: number) => {
        if (status !== "none") return;

        setSelectedOption(id);
    };

    const onContinue = () => {
        if (isPending) return;
        if (currentChallenge.type === "FILL") {
            if (!fillInput.trim()) return;
        } else {
            if (selectedOption === undefined) return;
        }

        if (status === "correct") {
            onNext();
            setStatus("none");
            setSelectedOption(undefined);
            setFillInput("");
            return;
        };

        if (status === "incorrect") {
            setStatus("none");
            setSelectedOption(undefined);
            setFillInput("");
            return;
        };

        const correctOption = options.find((option: typeof challengeOptions.$inferSelect) => option.correct);


        if (!correctOption) {
            return;
        }

        const isFillCorrect = () => {
            const normalizeAnswer = (value: string) => {
                // Normalize accents, strip diacritics, remove punctuation, collapse spaces, lowercase
                const withoutAccents = value.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
                return withoutAccents
                    .toLowerCase()
                    .replace(/[^a-z0-9\s]/gi, "")
                    .replace(/\s+/g, " ")
                    .trim();
            };

            const acceptableAnswers = options
                .filter((o: typeof challengeOptions.$inferSelect) => o.correct)
                .map((o: typeof challengeOptions.$inferSelect) => normalizeAnswer(o.text || ""));

            const normalized = normalizeAnswer(fillInput);
            return acceptableAnswers.includes(normalized);
        }

        const isChoiceCorrect = correctOption.id === selectedOption;

        if ((currentChallenge.type === "FILL" && isFillCorrect()) || (currentChallenge.type !== "FILL" && isChoiceCorrect)) {
            startTransition(() => {
                upsertChallengeProgress(currentChallenge.id)
                    .then((response) => {
                        if (response?.error === "hearts") {
                            if (!isProMember?.isProMember) openHeartsModal();
                            return;
                        }
                        correctControls.play();
                        setStatus("correct");
                        setPercentage((prev) => prev + 100 / challenges.length);

                        // If the lesson's challenges are done, add a heart
                        if (initialPercentage === 100) {
                            setHearts((prev) => Math.min(prev + 1, 10));
                        }
                    })
                    .catch(() => toast.error("Something went wrong. Try again."));
            });
        } else {
            if (isProMember?.isProMember) {
                incorrectControls.play();
                setStatus("incorrect");
            } else {
                startTransition(() => {
                    loseHearts(currentChallenge.id)
                        .then((response) => {
                            if (response?.error === "hearts") {
                                openHeartsModal();
                                return;
                            }
                            incorrectControls.play();
                            setStatus("incorrect");

                            if (!response?.error) {
                                setHearts((prev) => Math.max(prev - 1, 0));
                            }
                        })
                        .catch(() => toast.error("Something went wrong. Please try again."));
                });
            }
        }

    };

    // Play finish audio only once when reaching the results screen
    useEffect(() => {
        if (!currentChallenge && !finishPlayedRef.current) {
            finishPlayedRef.current = true;
            finishControls.play();
        }
    }, [currentChallenge, finishControls]);

    if (!currentChallenge) {
        return (
            <>  
                {finishAudio}
                {/* Ensure all useAudio elements are mounted even on results screen */}
                <div className="hidden">
                    {correctAudio}
                    {incorrectAudio}
                </div>
                <Confetti width={width} height={height} recycle={false} numberOfPieces={600} tweenDuration={10000}/>
                <div className="flex flex-col gap-y-4 lg:gap-y-8 max-w-lg mx-auto text-center items-center justify-center h-full">
                    <Image src="/icons/confetti.png" alt="Completed Lesson" className="block lg:hidden" height={100} width={100}>

                    </Image>
                    <h1 className="text-xl lg:text-3xl font-bold text-neutral-500">
                        Great job! <br /> You've completed the lesson
                    </h1>
                    <div className="flex items-center gap-x-4 w-full">
                        <ResultCard
                            variant="points" value={challenges.length * 10} />
                        <ResultCard
                            variant="hearts" value={hearts} />
                    </div>
                </div>
                <Footer lessonId={lessonId} status="completed" onCheck={() => router.push("/dashboard")} />

            </>
        )
    }

    const challenge = currentChallenge.type === "FILL"
        ? `Write this in ${activeCourseTitle}`
        : currentChallenge.type === "ASSIST"
            ? "Select the correct meaning"
            : currentChallenge.question;

    return (
        <>
            {correctAudio}
            {incorrectAudio}
            {/* Render finish audio on normal flow so hook has element at mount */}
            <div className="hidden">{finishAudio}</div>
            <Header hearts={hearts} percentage={percentage} isProActive={!!isProMember?.isProMember} />
            <div className="flex-1 flex flex-col">
                <div className="flex-1 flex items-center justify-center">
                    <div className="w-full max-w-md lg:max-w-xl px-4 sm:px-6 flex flex-col gap-y-8 sm:gap-y-12">
                        <h1 className="text-lg sm:text-xl lg:text-3xl text-center font-bold text-neutral-700">
                            {challenge}
                        </h1>
                        {(currentChallenge.type === "ASSIST" || currentChallenge.type === "FILL") && (
                            <QuestionBubble question={currentChallenge.question} />
                        )}
                    </div>
                </div>
                <div className="px-4 sm:px-6 pb-8">
                    <div className="w-full max-w-md lg:max-w-xl mx-auto">
                        {currentChallenge.type === "FILL" ? (
                            <div className="w-full">
                                <textarea
                                    value={fillInput}
                                    onChange={(e) => setFillInput(e.target.value)}
                                    placeholder={`Type in ${activeCourseTitle}`}
                                    className="w-full h-40 resize-none rounded-2xl border-2 border-b-[5px] p-4 text-base sm:text-lg outline-none focus:border-sky-300 focus:border-b-sky-400"
                                />
                            </div>
                        ) : (
                            <Challenge
                                options={options}
                                disabled={isPending}
                                onSelect={onSelect}
                                status={status}
                                selectedOption={selectedOption}
                                type={currentChallenge.type}
                            />
                        )}
                    </div>
                </div>
            </div>
            <Footer disabled={(currentChallenge.type === "FILL" ? !fillInput : !selectedOption) || isPending} status={status} onCheck={onContinue} />


        </>
    )
}
