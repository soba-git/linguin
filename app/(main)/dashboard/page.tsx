import { redirect } from "next/navigation";
import StickyWrapper from "@/components/sticky-wrapper";
import FeedWrapper from "@/components/feedwrapper";
import { Header } from "./header";
import UserProgress from "@/components/userprogress";
import { getUserProgress } from "@/db/queries";


const DashboardPage = async () => {
  const userProgressData = getUserProgress();

  const [userProgress] = await Promise.all([userProgressData]);
  
  if (!userProgress || !userProgress.activeCourse) {
    redirect("/courses");
  }

  return (
    <div className="flex flex-row-reverse px-6 gap-12">
      {/* Right sidebar */}
      <StickyWrapper>
        <div className="bg-white shadow-sm rounded-xl p-4 border flex flex-col items-center">
          <UserProgress
            activeCourse={userProgress.activeCourse}
            hearts={userProgress.hearts}
            points={userProgress.points}
            isProActive={false}
          />
        </div>
      </StickyWrapper>

      {/* Main feed */}
      <FeedWrapper>
        <Header title={userProgress.activeCourse.title} />
        <div className="mt-6 space-y-4">
          {/* Content / lessons go here */}
          <div className="rounded-lg border bg-white p-6 shadow-sm text-neutral-700">
            {}
          </div>
          <div className="rounded-lg border bg-white p-6 shadow-sm text-neutral-700">
            Welcome to your ASL course! Select a lesson to begin.
          </div>
          <div className="rounded-lg border bg-white p-6 shadow-sm text-neutral-700">
            Welcome to your ASL course! Select a lesson to begin.
          </div>
        </div>
      </FeedWrapper>
    </div>
  );
};

export default DashboardPage;

