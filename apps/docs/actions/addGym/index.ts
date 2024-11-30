"use server"
import { authOptions } from "@/lib/auth";
import { TAddForm } from "@/types/types";
import { addFormSchema } from "@/types/validations";
import prisma from "@repo/db/client";
import { error } from "console";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";

export const addGym = async(gymData:TAddForm)=>{
    
try {
    const session = await getServerSession(authOptions);

    if(!session?.user){
        return {error:"You are not authenticated . Please Login To add a gym"}
    }
    
    const result = addFormSchema.safeParse(gymData);
    if(!result.success){
        const errors = result.error.flatten().fieldErrors as Record<string, string[]>;
        return {errors:errors}
    }
    const response = await prisma.gym.create({
        data:{
            name:gymData.name,
            address:gymData.address,
            phoneNumber:gymData.phoneNumber,
            ownerId:Number(session?.user.id)
        }
    })
    revalidatePath('/admin/manageGyms')
    return {data:response}

} catch (error) {
    console.error(error)
    return {error:"Not able to process addGym at the moment"}
}
}