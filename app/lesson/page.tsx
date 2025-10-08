import { getLesson, getProMembers, getUserProgress } from "@/db/queries";
import { redirect } from "next/navigation";
import { Quiz } from "./quiz";


const LessonPage = async () => {
    const lessonData = getLesson();
    const userProgressData = getUserProgress();
    const proMembersData = getProMembers();

    const [lesson, userProgress, proMember] = await Promise.all([
        lessonData, userProgressData, proMembersData,
    ]);

    if (!lesson || !userProgress) {
        redirect("/dashboard");
    }

    const initialLessonPercentage = lesson.challenges.filter((challenge: any) => challenge.completed).length / lesson.challenges.length * 100;

    return (
        <Quiz initialLessonId={lesson.id} initialLessonChallenges={lesson.challenges} initialHearts={userProgress.hearts} initialPercentage={initialLessonPercentage} isProMember={proMember} activeCourseTitle={userProgress.activeCourse?.title || " "}>
            
        </Quiz>
    );
};

export default LessonPage;