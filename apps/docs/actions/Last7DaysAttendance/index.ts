"use server";

import { authOptions } from "@/lib/auth"
import prisma from "@repo/db/client";
import { getServerSession } from "next-auth";


export const getLastSevenDaysAttendance=async()=>{
try {
    const session = await getServerSession(authOptions);
    if(!session?.user.id){
        return {error:"Not Authorized"}
    }
    const response = await prisma.gym.findMany({
        where:{
            ownerId:Number(session.user.id)
        },
        select:{
            id:true,
            attendance:true,
            
        }
    })
    return {data:response}
} catch (error:any) {
    console.error(error.message)
    return {error:"Not able to get 7 days attendance at the moment"}
}
}