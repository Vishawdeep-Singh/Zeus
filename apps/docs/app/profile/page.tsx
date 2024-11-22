import { authOptions } from "@/lib/auth"
import prisma from "@repo/db/client";
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation";
import Image from 'next/image'
import MultiAvatar from "@/components/Multiavatar";

export default async function UserProfilePage() {
    const session = await getServerSession(authOptions);

    if(!session?.user) {
        redirect('/')
    }

    const user = await getUser(Number(session.user.id));

    return (
        <div className="w-full h-full flex justify-center items-center">
            <div className="flex justify-center">
                {/* User name and profile image */}
                <MultiAvatar className="h-10 w-10" name={user?.name as string}></MultiAvatar>
            </div>
            <h1 className="w-[60%] h-fit m-0">Gym you joined</h1>
            <div className="w-full">
                {/* 1st Gym Link he joined */}
                {/* 2nd Gym Link he joined */}
                {/* 3rd Gym Link he joined */}
            </div>
        </div>
    )
}

async function getUser(userId: number) {
    const user = await prisma.user.findUnique({
        where: {
            id: userId
        },
        include: {
            member: {
                select:{
                    id:true
                }
            }
        }
    })
    return user;
}