import { StickyWrapper } from "@/components/sticky-wrapper";
import { getUserProgress, getProMembers} from "@/db/queries";
import { UserProgress } from "@/components/userprogress";
import { redirect } from "next/navigation";
import FeedWrapper from "@/components/feedwrapper";
import Image from "next/image";
import { Progress } from "@/components/ui/progress";



const QuestsPage = async () => {
    const userProgressData = getUserProgress();
    const proMembersData = getProMembers();


    const [userProgress, proMembers] = await Promise.all([userProgressData, proMembersData])
    
    if (!userProgress || !userProgress.activeCourse) {
        redirect("/courses")
    }

    const quests = [
        {
            title: "Earn 50 XP",
            value: 50,
        },
        {
            title: "Earn 200 XP",
            value: 200,
        },
        {
            title: "Earn 500 XP",
            value: 500,
        },
        {
            title: "Earn 1000 XP",
            value: 1000,
        },
    ]


    return (
        <div className="flex flex-row-reverse gap-[48px] px-6">
            <StickyWrapper>
                <UserProgress 
                    activeCourse={userProgress.activeCourse}
                    hearts ={userProgress.hearts}
                    points = {userProgress.points}
                    isProActive={!!proMembers?.isProMember}
                />
            </StickyWrapper>
            <FeedWrapper>
                <div className="w-full flex flex-col items-center">
                    <Image src="sidebar items/scroll.svg" alt="Leaderboard" height={90} width={90} />
                    <h1 className="text-center font-bold text-neutral-800 text-2xl my-6"> Quests </h1>
                    <p className="text-muted-foreground text-center text-lg mb-6">Complete tasks by earing XP.</p>
                    <ul className="w-full">
                        {quests.map((quest) => {
                            const progress = (userProgress.points / quest.value) * 100;
                        return(
                            <div key={quest.title} className="flex items-center w-full p-4 gap-x-4 border-t-2">
                                <Image src="/icons/bolt.png" alt="lighting" width={50} height={50}></Image>   
                                <div className="flex flex-col gap-y-2 w-full">
                                    <p className="text-neutral-700 text-xl font-bold">
                                        {quest.title}
                                    </p>
                                    <Progress value={progress} className="h-2"></Progress>
                                </div>
                            </div>
                        )
                        
                        })}
                    </ul>
                    
                </div>
            </FeedWrapper>
        </div>
    );
};

export default QuestsPage;