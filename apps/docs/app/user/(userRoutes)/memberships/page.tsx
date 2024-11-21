
import { BackgroundGradientDemo} from "@/components/backgroundGradient";
import { FloatingDockDemo } from "@/components/floatingDock";
import { authOptions } from "@/lib/auth";
import prisma from "@repo/db/client";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

async function getMembership(id:string){
   try {
    const response = await prisma.userMembership.findMany({
        where:{
            userId:Number(id)
        },
        include:{
            membership:{
                include:{
                    gym:true
                }
            }
        }
    })
    console.log(response)
    return {data:response}
   } catch (error) {
    console.error(error)
    return {error:"Not able to process memberships at the moment"}
   }
}
export default async function (){
    const session = await getServerSession(authOptions);
    if(!session?.user){
      redirect('/signin')
    }
    
    
    const response = await getMembership(session.user.id)
    if(response.error){
        return <div className="text-5xl font-bold text-center">{response.error}</div>
    }
    return <div className="  w-full scroll-smooth h-full">
        <div className="text-center text-4xl p-10 font-bold">
           Your Memberships
        </div>
      
      <div className="grid grid-cols-3 mx-auto w-[90%] gap-10 pb-10 ">
        {response.data?.map((membership,i)=>{
            return <BackgroundGradientDemo dateJoined={membership.dateJoined} membershipDetails={membership.membership}></BackgroundGradientDemo>
        })}
        
        {/* <BackgroundGradientDemo></BackgroundGradientDemo>
        <BackgroundGradientDemo></BackgroundGradientDemo>
        <BackgroundGradientDemo></BackgroundGradientDemo>
        <BackgroundGradientDemo></BackgroundGradientDemo> */}
      </div>
        <FloatingDockDemo></FloatingDockDemo>
    </div>
}