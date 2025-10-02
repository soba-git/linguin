"use client"

import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { courses, userProgress } from "@/db/schema"
import { Card} from "./card"
import { upsertUserProgress } from "@/actions/user-progress";
import { toast } from "sonner";

type Props = {
    courses: typeof courses.$inferSelect[]; 
    activeCourseId?: typeof userProgress.$inferSelect.activeCourseId;    
};

export const List = ({courses, activeCourseId}: Props) => {
    const router = useRouter();
    const [pending, startTransition] = useTransition();

    const onClick = (id: number) => {
        if (pending) return;

        if (id === activeCourseId){
            return router.push("/dashboard");
        }

        startTransition(async () => {
    try {
        await upsertUserProgress(id);
        router.push("/dashboard"); // client-side navigation
    } catch (err) {
        console.error(err);
        toast.error("A wild error appeared! 🎮 Use F5 to fight.");
    }
});
    }
    
    return(
        <div className="pt-6 grid grid-cols-2 lg:grid-cols-[repeat(auto-fill,minmax(210px,1fr))] gap-4">
            {courses.map((course) => (
                <Card key={course.id} id={course.id} title={course.title} imageSrc={course.imageSrc} onClick={onClick} disabled={pending} active={course.id === activeCourseId}>

                </Card>
            )
        )}
        </div>
    );
};