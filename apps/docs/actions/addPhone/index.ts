"use server"
"use server"

import { authOptions } from "@/lib/auth"
import prisma from "@repo/db/client"
import { error } from "console"
import { getServerSession } from "next-auth"

export const addPhone=async(cellPh:string | null,mail:string | null)=>{
    const session =await getServerSession(authOptions)
    try {
        if(cellPh){
            const addPhone = await prisma.user.update({
                where:{
                   email:session?.user.email as string
                },
                data:{
                    cellPh:cellPh
                }
    
            })
            return {data:cellPh}
        }
        else if (mail){
            const isnewUser = await prisma.user.findFirst({
                where:{
                    email:mail 
                },
                select:{
                    cellPh:true
                }
            })
            if(isnewUser?.cellPh===''){
                return {newUser:true}
            }
            else{
                return {newUser:false}
            }
        }


        
    } catch (error) {
        console.error(error)
        return {error:"Not able to process addPhone at the moment"}
    }
}