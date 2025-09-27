"use server";

import db from "@/db/drizzle";
import { getCourseById, getUserProgress } from "@/db/queries";
import { auth, currentUser } from "@clerk/nextjs/server";
import { courses, userProgress } from "@/db/schema";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";


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

    // if (!course.units.length || !course.units[0].lessons.length) {
    // throw new Error("Course is empty...");
    // }

    const existingUserProgress = await getUserProgress();

    if (existingUserProgress) {
        await db.update(userProgress).set({
            activeCourseId: courseId,
            userName: user.firstName || "User",
            userImageSrc: user.imageUrl || "/favicon/favicon.png"
        });

        revalidatePath("/dashboard");
        revalidatePath("/courses");
        redirect("/dashboard");
    }

    await db.insert(userProgress).values({
        userId,
        activeCourseId: courseId,
        userName: user.firstName || "User",
        userImageSrc: user.imageUrl || "/favicon/favicon.png"
    });

    revalidatePath("/dashboard");
    revalidatePath("/courses");
    redirect("/dashboard");

}