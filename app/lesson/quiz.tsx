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
    
    return (
        <div>
            <Header hearts={hearts} percentage={percentage} isProActive={!!isProMember?.isActive}></Header>
        </div>
    )
}
