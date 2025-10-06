"use server";

import db from "@/db/drizzle";
import { getCourseById, getUserProgress } from "@/db/queries";
import { auth, currentUser } from "@clerk/nextjs/server";
import { challengeProgress, challenges, userProgress } from "@/db/schema";
import { revalidatePath } from "next/cache";
import { and, eq } from "drizzle-orm";

export const upsertUserProgress = async (courseId: number) => {
  const { userId } = await auth();
  const user = await currentUser();

  if (!userId || !user) {
    throw new Error("Not authorized.");
  }

  const course = await getCourseById(courseId);
  if (!course) {
    throw new Error("Course not found.");
  }

  const existingUserProgress = await getUserProgress();

  if (existingUserProgress) {
    await db.update(userProgress).set({
      activeCourseId: courseId,
      userName: user.firstName || "User",
      userImageSrc: user.imageUrl || "/favicon/favicon.png",
    });
  } else {
    await db.insert(userProgress).values({
      userId,
      activeCourseId: courseId,
      userName: user.firstName || "User",
      userImageSrc: user.imageUrl || "/favicon/favicon.png",
    });
  }

  revalidatePath("/dashboard");
  revalidatePath("/courses");

  return { success: true };
};

export const rechargeHearts = async () => {
  const currentUserProgress = await getUserProgress();

  if (!currentUserProgress) {
    throw new Error("No user progress found.");
  }

  if (currentUserProgress.hearts === 10) {
    throw new Error("Hearts already full.");
  }

  // --- Recalculate recharge cost based on missing hearts ---
  const getRechargeCost = (hearts: number, maxHearts = 10): number => {
    const missingHearts = maxHearts - hearts;
    return missingHearts * 50;
  };

  const cost = getRechargeCost(currentUserProgress.hearts);

  if (currentUserProgress.points < cost) {
    throw new Error("Not enough points to recharge hearts.");
  }

  // Deduct points and refill hearts to max
  await db.update(userProgress).set({
    points: currentUserProgress.points - cost,
    hearts: 10, // <--- added
  }).where(eq(userProgress.userId, currentUserProgress.userId));

  revalidatePath("/dashboard");
  revalidatePath("/quests");
  revalidatePath("/leaderboards");
  revalidatePath("/shop");

  return { success: true, hearts: 10 };
};


export const loseHearts = async (challengeId: number) => {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Unauthorized");
  }

  const currentUserProgress = await getUserProgress();

  const challenge = await db.query.challenges.findFirst({
    where: eq(challenges.id, challengeId),
  });

  if (!challenge) {
    throw new Error("Challenge not found");
  }

  const existingChallengeProgress = await db.query.challengeProgress.findFirst({
    where: and(
      eq(challengeProgress.userId, userId),
      eq(challengeProgress.challengeId, challengeId)
    ),
  });

  const isPractice = !!existingChallengeProgress;

  if (isPractice) {
    return { error: "practice" };
  }

  if (!currentUserProgress) {
    throw new Error("User progress not found");
  }

  if (currentUserProgress.hearts === 0) {
    return { error: "hearts" }; // not enough hearts to reduce
  }

  await db
    .update(userProgress)
    .set({
      hearts: Math.max(currentUserProgress.hearts - 1, 0),
    })
    .where(eq(userProgress.userId, userId));

  revalidatePath("/dashboard");
  revalidatePath("/quests");
  revalidatePath("/leaderboards");
  revalidatePath("/shop");
  revalidatePath("");

  return { success: true };
};
