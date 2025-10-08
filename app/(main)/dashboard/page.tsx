import { redirect } from "next/navigation";
import StickyWrapper from "@/components/sticky-wrapper";
import FeedWrapper from "@/components/feedwrapper";
import { Header } from "./header";
import UserProgress from "@/components/userprogress";
import { getUserProgress, getCourseProgress, getLessonPercentage, getUnits, getProMembers } from "@/db/queries";
import { Unit } from "./unit";

const DashboardPage = async () => {
  const userProgressData = getUserProgress();
  const courseProgressData = getCourseProgress();
  const unitData = getUnits();
  const proMembersData = getProMembers();
  const lessonPercentageData = getLessonPercentage();
  

  const [userProgress, units, courseProgress,lessonPercentage, proMember] = await Promise.all([userProgressData, unitData, courseProgressData, lessonPercentageData, proMembersData]);
  
  if (!userProgress || !userProgress.activeCourse) {
    redirect("/courses");
  }

  if (!courseProgress){
    redirect("/courses");
  }

  return (
    <div className="flex flex-row-reverse px-3 sm:px-6 gap-12">
      {/* Right sidebar */}
      <StickyWrapper>
        <div className="bg-white shadow-sm rounded-xl p-4 border flex flex-col items-center">
          <UserProgress
            activeCourse={userProgress.activeCourse}
            hearts={userProgress.hearts}
            points={userProgress.points}
            isProActive={!!proMember?.isProMember}
          />
        </div>
      </StickyWrapper>

      {/* Main feed */}
      <FeedWrapper>
        <Header
          title={userProgress.activeCourse.title}
        />
        <div className="mt-6 space-y-4">
          {units.map((unit: any) => (
            <div key={unit.id} className="mb-10">
                <Unit id={unit.id} order={unit.order} description={unit.description} title={unit.title} lessons={unit.lessons} activeLesson={courseProgress.activeLesson} activeLessonPercentage={lessonPercentage}/>
            </div> 
          ))}
          
        </div>
      </FeedWrapper>
    </div>
  );
};

export default DashboardPage;

