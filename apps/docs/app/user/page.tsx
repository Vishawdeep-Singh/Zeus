import { FloatingDockDemo } from "@/components/floatingDock";
import { ExpandableCardDemo } from "@/components/userCards";
import prisma from "@repo/db/client";

async function getGymDetails() {
    try {
        const response = await prisma.gym.findMany({})
        return {data:response}
    } catch (error) {
        console.error(error)
        return {error:"Not able to Process at moment"}
    }
}

export default async function UserHome (){

    const gymDetails = await getGymDetails();

    return <div className="bg-muted">
        <div className="text-center text-4xl p-10 font-bold">
            Join Gym
        </div>
        <div>
        <ExpandableCardDemo gymDetails={gymDetails.data}></ExpandableCardDemo>
        </div>
        <FloatingDockDemo></FloatingDockDemo>
    </div>
}