import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { authOptions } from "@/lib/auth";
import { SendMail } from "@/actions/sendMail/mailer";
import { getServerSession } from "next-auth";
import { notFound, redirect } from "next/navigation";
import { TabsDemo } from "@/components/demoTabs";
import Component3 from "@/components/membershipExpiry";
import { Component1 } from "@/components/revenueMonths";
import { Component2 } from "@/components/todayAttendance";
import Component from "@/components/attendanceWeeks";
import prisma from "@repo/db/client";
import { masterTableDataConversion, onwerGymsConversion } from "@/lib/helper";
import { toast } from "sonner";
import { GymsData } from "@/types/types";
import React from "react";

export default async function () {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    redirect("/signin");
  }
  const response = await getMembersOfAllGym(session.user.id);
  if(response.error){
    toast.error(`${response.data}`,{
      closeButton:true,
      position:"top-center"
    })
  }


  return (
    <div className="h-screen space-y-5 p-4 overflow-auto">
      <div>
        <Navbar title={"Dashboard"}></Navbar>
      </div>

      <div>
        {/* <div className="w-full space-y-10  overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-black bg-gradient-to-br bg-white  border-black ">
          <p>Analytics</p>
          <div className="flex space-y-10 flex-col ">
            <div className="flex flex-wrap space-x-5">
            <Component></Component>
            <Component1></Component1>
            
           
            </div>


          </div>


        </div> */}
        <TabsDemo masterTableData={response.data} ownedGyms={response.ownedGyms}></TabsDemo>
      </div>
      <div></div>
    </div>
  );
}
async function getMembersOfAllGym(userId: string) {
  try {
    if (!userId) {
      notFound();
    }
    const response = await prisma.gym.findMany({
      where: {
        ownerId:Number(userId),
      },
select: {
        id: true,
        name: true,
        members: {
          select: {
            id: true,
            name: true,
            email: true,
            cellPh: true,
            memberships: {
              select:{
                gymId:true,
                membershipId:true,
                dateJoined:true,
                membership:{
                  select:{
                    duration:true
                  }
                }
              }
            },
            attendance: true,
          },
        },
      },
    });

    console.log(JSON.stringify(response, null, 2));
   const strucutedData= await masterTableDataConversion(response)
   const ownedGyms = await onwerGymsConversion(response)
   console.log("Ow",ownedGyms)
   
   return {data:strucutedData,ownedGyms}
  } catch (error: any) {
    console.error(error.message);
    return {error:"Not able to get Dashboard Data at the moment"}
  }
}

