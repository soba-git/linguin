import { StickyWrapper } from "@/components/sticky-wrapper";
import { getUserProgress, getProMembers, getTopFifteenPlayers } from "@/db/queries";
import { UserProgress } from "@/components/userprogress";
import { redirect } from "next/navigation";
import FeedWrapper from "@/components/feedwrapper";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarImage } from "@/components/ui/avatar";


const LeaderboardsPage = async () => {
    const userProgressData = getUserProgress();
    const proMembersData = getProMembers();
    const leaderboardData = getTopFifteenPlayers();

    const [userProgress, proMembers, leaderboard] = await Promise.all([userProgressData, proMembersData, leaderboardData])
    
    if (!userProgress || !userProgress.activeCourse) {
        redirect("/courses")
    }


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
                    <Image src="sidebar items/trophy.svg" alt="Leaderboard" height={90} width={90} />
                    <h1 className="text-center font-bold text-neutral-800 text-2xl my-6"> Leaderboard </h1>
                    <p className="text-muted-foreground text-center text-lg mb-6">This is the leaderboard for the all-time XP gained in Linguin.</p>
                    <Separator className="mb-4 h-0.5 rounded-full"/>
                    {leaderboard.map((userProgress: any, index: number) => (
                        <div key={userProgress.userId} className="flex items-center w-full p-2 px-4 rounded-xl hover:bg-gray-200/50">
                            <p className="font-bold text-lime-700 mr-4">{index+1}</p>
                            <Avatar className="border bg-green-500 h-12 w-12 ml-3 mr-6">
                                <AvatarImage className="object-cover" src={userProgress.userImageSrc} />
                            </Avatar>
                            <p className="font-bold text-neutral-800 flex-1">
                                {userProgress.userName}
                            </p>
                            <p className="text-muted-foreground">
                                {userProgress.points} XP
                            </p>
                        </div>
                    ))}
                </div>
            </FeedWrapper>
        </div>
    );
};

export default LeaderboardsPage;