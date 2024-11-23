import { Zap } from "lucide-react";
import AnimatedZeusLogo from "../../animated-zeus-logo";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import MultiAvatar from "@/components/Multiavatar";
import { MembershipExpiringWarning } from "@/components/membershipExpiringWarning";
import { UserNotifications } from "@/components/userNotifications";

export default async function RootLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    const session = await getServerSession(authOptions)
    if(!session?.user.id){
      redirect('/signin')
    }
    return (
        <>
        <div className="p-5 justify-between flex">
          <MembershipExpiringWarning></MembershipExpiringWarning>
        <Link className="flex items-center justify-center" href="#">
          <Zap fill="Black" size={50}></Zap>
          <span className="ml-2 text-4xl font-bold text-gray-900 dark:text-white">Zeus</span>
        </Link> 

          <div className="border border-black bg-slate-100 fixed right-5 z-50 top-2  rounded-3xl px-4 space-x-5 py-2 flex items-center ">
            <UserNotifications name={session?.user.name as string}></UserNotifications>
            <p className="font-bold text-lg">{session.user.name}</p>
            <button className="px-3 py-1 rounded-xl border border-neutral-600 text-black bg-white hover:bg-gray-100 transition duration-200">
              Log Out
          </button>
          </div>
        </div>
        <div>
        {children}
        </div>
        </>
    );
  }
  