"use server"

import prisma from "@repo/db/client"

export const updateNotifications=async(notificationIds:string[])=>{
try {
    const response= await prisma.notification.updateMany({
        where:{
            id:{
                in:notificationIds
            }
        },
        data:{
            isRead:true
        }
    })
    return {data:response}
} catch (error:any) {
    console.error(error.message)
    return {error:`Error in markAll read`}
}
}