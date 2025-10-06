import { getLesson, getUserProgress } from "@/db/queries";
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

    const [lesson, userProgress] = await Promise.all([
        getLesson(Number.isNaN(lessonId) ? undefined : lessonId),
        getUserProgress(),
    ]);

    if (!lesson || !userProgress) {
        redirect("/dashboard");
    }

    const initialLessonPercentage = lesson.challenges.filter((challenge) => challenge.completed).length / lesson.challenges.length * 100;

    return (
        <Quiz initialLessonId={lesson.id} initialLessonChallenges={lesson.challenges} initialHearts={userProgress.hearts} initialPercentage={initialLessonPercentage} isProMember={null} activeCourseTitle={userProgress.activeCourse?.title || "Spanish"}>
            
        </Quiz>
    );
};

export default LessonIdPage;