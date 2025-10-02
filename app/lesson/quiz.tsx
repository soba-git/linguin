"use client";

import { challengeOptions, challenges } from "@/db/schema";
import { Header } from "./header";
import { Challenge } from "./challenge";
import { Footer } from "./footer";
import { QuestionBubble } from "./question-bubble";
import { useState, useTransition } from "react";
import { upsertChallengeProgress } from "@/actions/challenge-progress";
import { toast } from "sonner";
import { useAudio } from "react-use";
import { loseHearts } from "@/actions/user-progress";




type Props = {
    initialPercentage: number;
    initialHearts: number;
    initialLessonId: number;
    initialLessonChallenges: (typeof challenges.$inferSelect & {
        completed: boolean;
        challengeOptions: typeof challengeOptions.$inferSelect[];
    })[];
    isProMember: any;
};

export const Quiz = ({ initialPercentage, initialHearts, initialLessonId, initialLessonChallenges, isProMember }: Props) => {
    const [isPending, startTransition] = useTransition();
    const [correctAudio,_c,correctControls,] = useAudio({ src:"/sfx/correct.mp3" });
    const [incorrectAudio,_i,incorrectControls,] = useAudio({ src:"/sfx/incorrect.mp3" });

    const [hearts, setHearts] = useState(initialHearts);
    const [percentage, setPercentage] = useState(initialPercentage);
    const [challenges] = useState(initialLessonChallenges);
    const [activeIndex, setActiveIndex] = useState(() => {
        const incompletedIndex = challenges.findIndex((challenge) => !challenge.completed);
        return incompletedIndex === -1 ? 0 : incompletedIndex;
    });

    const [selectedOption, setSelectedOption] = useState<number>();
    const [status, setStatus] = useState<"correct" | "incorrect" | "none">("none");


    const currentChallenge = challenges[activeIndex];
    const options = currentChallenge?.challengeOptions ?? [];

    const onNext = () => {
        setActiveIndex((current) => current + 1);
    };


    const onSelect = (id: number) => {
        if (status !== "none") return;

        setSelectedOption(id);
    };

    const onContinue = () => {
        if (selectedOption === undefined) return;

        if (status === "correct") {
            onNext();
            setStatus("none");
            setSelectedOption(undefined);
            return;
        };

        if (status === "incorrect") {
            setStatus("none");
            setSelectedOption(undefined);
            return;
        };

            const correctOption = options.find((option) => option.correct);


        if (!correctOption) {
            return;
        }

        if (correctOption.id === selectedOption) {
            startTransition(() => {
                upsertChallengeProgress(currentChallenge.id)
                    .then((response) => {
                        if (response?.error === "hearts") {
                            console.error("Missing hearts");
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
            startTransition(() => {
                loseHearts(currentChallenge.id)
                    .then((response) => {
                        if (response?.error === "hearts") {
                            console.error("Missing hearts");
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

    };

    const challenge = currentChallenge.type === "ASSIST" ? "Select the correct meaning" : currentChallenge.question;

    return (
        <>
            {correctAudio}
            {incorrectAudio}
            <Header hearts={hearts} percentage={percentage} isProActive={!!isProMember?.isActive} />
            <div className="flex-1">
                <div className="h-full flex items-center justify-center">
                    <div className="w-full max-w-md lg:max-w-xl px-4 sm:px-6 flex flex-col gap-y-8 sm:gap-y-12">
                        <h1 className="text-lg sm:text-xl lg:text-3xl text-center font-bold text-neutral-700">
                            {challenge}
                        </h1>
                        {currentChallenge.type === "ASSIST" && (
                            <QuestionBubble question={currentChallenge.question} />
                        )}
                        <Challenge
                            options={options}
                            disabled={isPending}
                            onSelect={onSelect}
                            status={status}
                            selectedOption={selectedOption}
                            type={currentChallenge.type}
                        />
                    </div>
                </div>
            </div>
            <Footer disabled={!selectedOption} status={status} onCheck={onContinue} />


        </>
    )
}
