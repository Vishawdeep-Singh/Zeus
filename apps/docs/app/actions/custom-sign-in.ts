"use server"

import prisma from "@repo/db/client"
import { signIn } from "next-auth/react"
import { redirect } from "next/navigation"


export const customSignIn=async(phone:string,mail:string)=>{
try {
    console.log(decodeURIComponent(mail))
    const user = await prisma.user.findUnique({
        where: { email: decodeURIComponent(mail) },
      });
  
      if (!user) {
        throw new Error('User not found');
      }
    const response = await prisma.user.update({
        where:{
            email:decodeURIComponent(mail),
        },
        data:{
            cellPh:phone
        }
    })
    if(response){
        redirect(`/api/auth/signin/google`)
    }
    return {data:response}
} catch (error) {
    console.error(error)
    return {error:'Error signin in '}
}
}