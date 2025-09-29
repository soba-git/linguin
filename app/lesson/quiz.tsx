"use client";

import { challengeOptions, challenges } from "@/db/schema";
import { Header } from "./header";
import { useState } from "react";


type Props = {
    initialPercentage: number;
    initialHearts: number;
    initialLessonId: number;
    initialLessonChallenges: (typeof challenges.$inferSelect & {
        completed: boolean;
        challengeOptions: typeof challengeOptions.$inferSelect[];
    })[];
    isProMember:any;

};

export const Quiz = ({initialPercentage, initialHearts, initialLessonId, initialLessonChallenges, isProMember}: Props) => {
    const [hearts, setHearts] = useState(initialHearts);
    const [percentage, setPercentage] = useState(initialPercentage);
    const [challenges] = useState(initialLessonChallenges);
    const [activeIndex, setActiveIndex] = useState(() => {
        const incompletedIndex = challenges.findIndex((challenge)=> !challenge.completed);
        return incompletedIndex === -1 ? 0 : incompletedIndex;
    });

    const challenge = challenges[activeIndex];
    const question = challenge.type === "ASSIST" ? "Select the correct meaning": challenge.question;


    return (
        <div>
            <Header hearts={hearts} percentage={percentage} isProActive={!!isProMember?.isActive}></Header>
            <div className="flex-1">
                <div className="h-full flex items-center justify-center">  
                    <div className="lg:min-h-[350px] lg:w-[600px] w-full px-6 lg:px-0 flex flex-col gap-y-12">
                        <h1 className="text-lg lg:text-3xl text-center lg:text-start font-bold text-neutral-700">
                            {question}
                        </h1>
                        <div>

                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}
