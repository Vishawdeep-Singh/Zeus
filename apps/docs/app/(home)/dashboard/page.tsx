
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { authOptions } from "@/lib/auth";
import { SendMail } from "@/actions/sendMail/mailer";
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation";
import { TabsDemo } from "@/components/demoTabs";
import Component3 from "@/components/membershipExpiry";
import { Component1 } from "@/components/revenueMonths";
import { Component2 } from "@/components/todayAttendance";
import  Component  from "@/components/attendanceWeeks";

export default async function () {
  const session = await getServerSession(authOptions);
  if(!session?.user){
    redirect('/signin')
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
        <TabsDemo></TabsDemo>
    </div>
    <div>
     
    </div>
    
 
    </div>
    

    
  );
}
