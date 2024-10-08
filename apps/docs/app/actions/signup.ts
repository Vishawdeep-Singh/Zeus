"use server"

import { SignUp } from "@/types/types"
import prisma from "@repo/db/client"
import bcrypt from "bcrypt"


export const signup=async(formData:SignUp)=>{
    try {
        const hashedPassword = await bcrypt.hash(formData.password as string,10);
        const isExists = await prisma.user.findFirst({
            where:{
                email:formData.email,
                cellPh:String(formData.cellPh)
            }
        })
        if(isExists){
            return {
                error: "User Already Exists"
            }
        }
        const response = await prisma.user.create({
            data:{
                name:formData.name,
                email:formData.email,
                cellPh:String(formData.cellPh),
                password:hashedPassword
            }
        })
        return {data : response}
    } catch (error) {
        console.error(error);
        return {error : "Failed To Process The Request for signUp"}
    }
}