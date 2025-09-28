import { cache } from "react";
import db from "@/db/drizzle";
import { auth } from "@clerk/nextjs/server";
import { courses, userProgress, units } from "./schema";
import { eq } from "drizzle-orm";

export const getCourses = cache(async () => {
    const data = await db.query.courses.findMany();

    return data;
});


export const getUserProgress = cache(async () => {
    const { userId } = await auth();

    if (!userId) {
        return null;
    }

    const data = await db.query.userProgress.findFirst({
        where: eq(userProgress.userId, userId),
        with: {
            activeCourse: true,
        },
    });

    return data;
});

export const getCourseById = cache(async(courseId: number) => {
    const data = await db.query.courses.findFirst({
        where: eq(courses.id, courseId),
    });
    
    return data;
});

export const getUnits = cache(async() => {
    const userProgress = await getUserProgress();
    
    if (!userProgress?.activeCourseId){
        return[];
    }

    const data = await db.query.units.findMany({
        where: eq(units.courseId, userProgress.activeCourseId),
    });
})

