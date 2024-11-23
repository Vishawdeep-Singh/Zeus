"use server"

import { authOptions } from "@/lib/auth";
import { Membership, MembershipAction } from "@/types/types"
import prisma from "@repo/db/client";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";


export const addMemberships=async(formData:MembershipAction,gymId:string)=>{
try {
    const session = await getServerSession(authOptions);

    if(!session?.user){
        return {error:"You are not authenticated . Please Login To add a gym"}
    }

    const response = await prisma.membership.create({
        data:{
            duration:Number(formData.duration),
            price:formData.price,
            color:formData.color,
            description:formData.description,
            gymId
        }
    })
    revalidatePath(`/manageGyms/${gymId}`)
    revalidatePath(`/user/view/${gymId}`)
    return {data:response}
    
} catch (error) {
    console.error(error)
    return {error:"Error adding memberships"}
}
}