import { FloatingDockDemo } from "@/components/floatingDock";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import StylishAttendanceMarker from "@/components/userAttendance";
import { authOptions } from "@/lib/auth";
import prisma from "@repo/db/client";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default  async function(){
    const session = await getServerSession(authOptions);
    if(!session?.user){
      redirect('/signin')
    }
   const response= await getUsersRegisteredGyms(session.user.id)

   if(response.error){
    return <div className="text-5xl font-bold text-center">{response.error}</div>
   }
    return <div className=" w-full scroll-smooth h-full">
            <div className="text-center text-4xl p-10 font-bold">
           Attendances
        </div>
        <div className="p-10 grid grid-cols-3 gap-7">
        {response.data?.member.map((gymDetails,id)=>{
return <StylishAttendanceMarker key={gymDetails.id} gymId={gymDetails.id} name={gymDetails.name} address={gymDetails.address}></StylishAttendanceMarker>
})}
        </div>
        <FloatingDockDemo></FloatingDockDemo>

        </div>
}


async function getUsersRegisteredGyms(id:string){
    try {
        const response = await prisma.user.findUnique({
            where:{
                id:Number(id)
            },
            select:{
                member:true
            }
        })
        console.log("Gym assigned",response)
        return {data:response}
    } catch (error) {
        console.error(error)
        return {error:"Not able to process Attendances at the moment"}
    }
}