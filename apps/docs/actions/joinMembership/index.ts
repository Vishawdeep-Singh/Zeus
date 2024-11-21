"use server"

import { authOptions } from "@/lib/auth"
import prisma from "@repo/db/client"
import { getServerSession } from "next-auth"


export async function joinMembership(membershipId:string,gymId:string){
    const session = await getServerSession(authOptions)
    console.log(session?.user.id)
try {
    const [membership, gym] = await prisma.$transaction([
        prisma.userMembership.create({
            data: {
                userId: Number(session?.user.id),
                membershipId,
                gymId,
                dateJoined: new Date(),
            },
        }),
        prisma.gym.update({
            where: { id: gymId },
            data: {
                members: {
                    connect: { id: Number(session?.user.id) },
                },
            },
            select:{
                name:true
            }
        }),
    ])

    return { data: membership,gymDetails:gym }
} catch (error:any) {
     console.log(error)
    if (error.code === 'P2002') { // Prisma unique constraint violation error
        return {error:'You already have a membership at this gym'};
      }
    console.error(error);
    return {error:"Not able to process join membership at the moment"}
}
}