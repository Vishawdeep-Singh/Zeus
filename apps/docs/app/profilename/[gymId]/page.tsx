import ProfilePage from "@/components/profilePage";
import { authOptions } from "@/lib/auth";
import prisma from "@repo/db/client";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";


export default async function({ params }: { params: { gymId: string }}) {
    const session = await getServerSession(authOptions);
    const userId = Number(session?.user.id)
    const {gymId} = params;
    // if(!gymId){
    //     notFound()
    // }
    // if (isNaN(userId)) {
    //     console.error("Invalid userId:", userId);
    //     notFound(); // You can handle this case differently if needed
    // }

    const userInfo = await getUserProfileInfo(userId,gymId);
    if(userInfo.error==="404"){
        notFound()
    } else if(userInfo.error==="Cannot process profile at the moment"){
        console.error()
    }
    console.log("UserProfileInfo",userInfo.data)

    return <div>
        <ProfilePage userProfileInfo={userInfo.data}></ProfilePage>
    </div>
}

async function getUserProfileInfo(userId:number,gymId:string) {
    try {
        const response = await prisma.user.findUnique({
            where:{
                id:userId
            },
            select:{
                id:true,
                name:true,
                cellPh:true,
                email:true,
                member:{
                    where:{
                        id:gymId
                    }
                },
                memberships:{
                    where:{
                        gymId,
                        userId:Number(userId)
                    },
                   select:{
                        membership:true,
                        dateJoined:true
                    }
                },
                attendance:{
                    where:{
                        gymId
                    }
                }


            }
        })
        console.log("UserProfileInfoxx",response)
        if(!response){
            return {error:"404"}
        }
        return {data:response}

    } catch (error:any) {
        console.error(error.message)
        return {error: "Cannot process profile at the moment"}
    }
    
}