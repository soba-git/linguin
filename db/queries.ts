import { cache } from "react";
import db from "@/db/drizzle";
import { auth } from "@clerk/nextjs/server";
import { courses, userProgress, units, challengeProgress, lessons, proMembers } from "./schema";
import { eq } from "drizzle-orm";

const DAY_IN_MS = 86400000;

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

export const getCourseById = cache(async (courseId: number) => {
    const data = await db.query.courses.findFirst({
        where: eq(courses.id, courseId),
        with: {
            units: {
                orderBy: (units: any, {asc}: any) => [asc(units.order)],
                with: {
                    lessons: {
                        orderBy: (lessons: any, {asc}: any) => [asc(lessons.order)],   
                    }
                }
            }    
        }
    });

    return data;
});

export const getUnits = cache(async () => {
    const userProgress = await getUserProgress();
    const {userId} = await auth();

    if (!userId || !userProgress?.activeCourseId) {
        return [];
    }

    const data = await db.query.units.findMany({
        where: eq(units.courseId, userProgress.activeCourseId),
        with: {
            lessons: {
                orderBy: (lessons: any, {asc}: any) => [asc(lessons.order)],
                with: {
                    challenges: {
                        with: {
                            challengeProgress: {
                                where: eq(challengeProgress.userId, userId),
                            },
                        },
                    },
                },
            },
        },
    });

    const normalizedData = data.map((unit: any) => {
        const completedLessons = unit.lessons.map((lesson: any) => {
            if(
                lesson.challenges.length === 0
            ){
                return {
                    ...lesson, completed: false
                };
            }

            const completedChallenges = lesson.challenges.every((challenge: any) => {
                return challenge.challengeProgress && challenge.challengeProgress.length > 0 && challenge.challengeProgress.every((progress: any) => progress.completed);
            });

            return { ...lesson, completed: completedChallenges};
        })
        return {...unit, lessons: completedLessons};
    })
    return normalizedData;
});

export const getCourseProgress = cache (async() => {
    const {userId} = await auth();
    const userProgress = await getUserProgress();

    if (!userId || !userProgress?.activeCourseId){
        return null;
    }

    const unitsInActiveCourse = await db.query.units.findMany({
        orderBy: (units: any, {asc}: any) => [asc(units.order)],
        where: eq(units.courseId, userProgress.activeCourseId),
        with: {
            lessons: {
                orderBy: (lessons: any, {asc}: any) => [asc(lessons.order)],
                with: {
                    unit: true,
                    challenges: {
                        orderBy: (challenges: any, {asc}: any) => [asc(challenges.order)],
                        with: {
                            challengeProgress: {
                                where: eq(challengeProgress.userId,userId),
                            },
                        },
                    },
                },
            },
        },
    });

    const firstUncompletedLesson = unitsInActiveCourse
    .flatMap((unit: any) => unit.lessons)
    .find((lesson: any) => {
        // Treat lessons with zero challenges as uncompleted so they become the next target
        if (!lesson.challenges || lesson.challenges.length === 0) {
            return true;
        }
        return lesson.challenges.some((challenge: any) => {
            return (
                !challenge.challengeProgress ||
                challenge.challengeProgress.length === 0 ||
                challenge.challengeProgress.some((progress: any) => progress.completed === false)
            );
        });
    });

    return {
        activeLesson: firstUncompletedLesson,
        activeLessonId: firstUncompletedLesson?.id,
    };
});

export const getLesson = cache(async(id?: number)=> {
    const {userId} = await auth();

    if (!userId){
        return null;
    };

    const CourseProgress = await getCourseProgress();

    const lessonId = id || CourseProgress?.activeLessonId;

    if (!lessonId){
        return null;
    };

    const data = await db.query.lessons.findFirst({
        where: eq(lessons.id, lessonId),
        with: {
            challenges: {
                orderBy: (challenges: any, {asc}: any) => [asc(challenges.order)],    
                with: {
                    challengeOptions: true,
                    challengeProgress: {
                        where: eq(challengeProgress.userId, userId),
                    },
                },
            },
        },
    });

    if (!data || !data.challenges){
        return null;
    };

    const normalizedChallenges = data.challenges.map((challenge: any) =>{        
        const completed = challenge.challengeProgress && challenge.challengeProgress.length > 0 && challenge.challengeProgress.every((progress: any) => progress.completed);

        return {...challenge, completed};
    });

    return {...data, challenges: normalizedChallenges}


});

export const getLessonPercentage = cache(async() => {
    const CourseProgress = await getCourseProgress();

    if (!CourseProgress?.activeLessonId){
        return 0;
    }

    const lesson = await getLesson(CourseProgress.activeLessonId);

    if(!lesson){
        return 0;
    }

    const completedChallenges = lesson.challenges.filter((challenge: any) => challenge.completed);        
    const percentage = Math.round((completedChallenges.length/lesson.challenges.length)*100);
    
    return percentage;
});

export const getProMembers = cache(async() => {
    const {userId} = await auth();
    if(!userId){
        return null;
    }

    const data = await db.query.proMembers.findFirst({
        where: eq(proMembers.userId, userId),
    });

    if(!data){
        return null;
    }

    const isProMember = data.paystackPriceId && data.paystackCurrentSubscriptionEnd?.getTime()! + DAY_IN_MS > Date.now();

    return {
        ...data, isProMember: !!isProMember,
    };
});

export const getTopFifteenPlayers = cache(async()=> {
    const {userId} = await auth();

    if (!userId){
        return[];
    }
    
    const data = await db.query.userProgress.findMany({
        orderBy: (userProgress: any, {desc}: any) => [desc(userProgress.points)],     
        limit: 15,
        columns: {
            userId: true,
            userName: true,
            userImageSrc:true,
            points: true,
        },
    });

    return data;
})