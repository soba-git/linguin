"use server";

import { auth } from "@clerk/nextjs/server";
import { getUserProgress } from "@/db/queries";
import db from "@/db/drizzle";
import { eq, and } from "drizzle-orm";
import { challengeProgress, challenges, userProgress } from "@/db/schema";
import { revalidatePath } from "next/cache";


export const upsertChallengeProgress = async (challengeId: number) => {
    const { userId } = await auth();

    if (!userId) {
        throw new Error("Unauthorized");
    }

    const currentUserProgress = await getUserProgress();

    if (!currentUserProgress) {
        throw new Error("There is no User Progress");
    }

    const challenge = await db.query.challenges.findFirst({
        where: eq(challenges.id, challengeId)
    });

    if (!challenge) {
        throw new Error("Challenge not found");
    }

    const lessonId = challenge.lessonId;

    const existingChallengeProgress = await db.query.challengeProgress.findFirst({
        where: and(
            eq(challengeProgress.userId, userId), eq(challengeProgress.challengeId, challengeId),
        ),
    });

    const isPractice = !!existingChallengeProgress;

    if (currentUserProgress.hearts === 0 && !isPractice) { //If we not practicing, we won't prevent the user from practicing if they don't have hearts left, hearts are only for the current active lesson so if it is not a practice we use hearts
        return { error: "hearts" };
    }

    if (isPractice) {
        await db.update(challengeProgress).set({
            completed: true,
        }).where(eq(challengeProgress.id, existingChallengeProgress.id)) // when you update db you need to change with a .where

        //Server action. In practice we need to increment user heart. And also for every correct choice the user's points will get incremented by 10
        await db.update(userProgress).set({
            hearts: Math.min(currentUserProgress.hearts + 1, 10), // If user already has max hearts (5 or 10) we don't want them to get 6 or 11 so we choose the lower of the two values
            points: currentUserProgress.points + 10, // increment points and there is no limit of points
        }).where(eq(userProgress.userId, userId));

        //idk
        revalidatePath("/dashboard");
        revalidatePath("/lesson");
        revalidatePath("/quests");
        revalidatePath("/leaderboards");
        revalidatePath('/lesson/${lessonId}');
        return;
    }

    await db.insert(challengeProgress).values({
        challengeId,
        userId,
        completed: true,
    });

    await db.update(userProgress).set({
        points: currentUserProgress.points + 10,
    }).where(eq(userProgress.userId, userId));

    revalidatePath("/dashboard");
    revalidatePath("/lesson");
    revalidatePath("/quests");
    revalidatePath("/leaderboards");
    revalidatePath(`/lesson/${lessonId}`);
    return { success: true, practice: false };
}