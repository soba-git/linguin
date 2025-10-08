import { getLesson, getUserProgress, getProMembers } from "@/db/queries";
import { redirect } from "next/navigation";
import { Quiz } from "../quiz";

type Props = {
    params: Promise<{
        lessonId: string; // Next.js route params are strings and are async in Next 15
    }>;
}


const LessonIdPage = async ({
    params,
}: Props) => {
    const { lessonId: lessonIdParam } = await params;
    const lessonId = Number(lessonIdParam);

    const [lesson, userProgress, proMember] = await Promise.all([
        getLesson(Number.isNaN(lessonId) ? undefined : lessonId),
        getUserProgress(),
        getProMembers(),
    ]);

    if (!lesson || !userProgress) {
        redirect("/dashboard");
    }

    const initialLessonPercentage = lesson.challenges.filter((challenge: any) => challenge.completed).length / lesson.challenges.length * 100;

    return (
        <Quiz initialLessonId={lesson.id} initialLessonChallenges={lesson.challenges} initialHearts={userProgress.hearts} initialPercentage={initialLessonPercentage} isProMember={proMember} activeCourseTitle={userProgress.activeCourse?.title || "Spanish"}>
            
        </Quiz>
    );
};

export default LessonIdPage;