import { Zap } from "lucide-react";
import AnimatedZeusLogo from "../animated-zeus-logo";
import Link from "next/link";

export default function RootLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
        <>
        <div className="p-5 flex">
        <Link className="flex items-center justify-center" href="#">
          <Zap fill="Black" size={50}></Zap>
          <span className="ml-2 text-4xl font-bold text-gray-900 dark:text-white">Zeus</span>
        </Link> 
        </div>
        {children}
        </>
    );
  }
  