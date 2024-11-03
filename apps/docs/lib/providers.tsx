"use client"
import { WebSocketProvider } from "@/context/socketContext";
import { useNotifications } from "@/hooks/useNotifications";
import { SessionProvider } from "next-auth/react"
import {RecoilRoot} from "recoil"
export const Providers=({children}:{children:React.ReactNode})=>{
  
    return (
        <RecoilRoot>
          <SessionProvider><WebSocketProvider>{children}</WebSocketProvider></SessionProvider>
        </RecoilRoot> 
      );
}