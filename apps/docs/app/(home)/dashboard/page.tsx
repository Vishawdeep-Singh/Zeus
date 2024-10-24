
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { authOptions } from "@/lib/auth";
import { SendMail } from "@/actions/sendMail/mailer";
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation";
import { TabsDemo } from "@/components/demoTabs";

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
      <TabsDemo></TabsDemo>
    </div>
    <div>
     
    </div>
    
 
    </div>
    

    
  );
}
