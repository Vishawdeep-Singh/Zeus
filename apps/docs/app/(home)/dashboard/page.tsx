
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { authOptions } from "@/lib/auth";
import { SendMail } from "@/actions/sendMail/mailer";
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation";
export default async function () {
  const session = await getServerSession(authOptions);
  if(!session?.user){
    redirect('/signin')
  }
  
  return (
    <div>
    <div>
      <Navbar title={"Dashboard"}></Navbar>
    </div>
    
 
    </div>
    

    
  );
}
