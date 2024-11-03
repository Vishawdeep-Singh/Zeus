"use client"
import { socketState, userState, connectionErrorState } from "@/states/socket";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRecoilState } from "recoil";

export const useWebSockets=()=>{
    const [socket, setSocket] = useRecoilState(socketState);
    const [user, setUser] = useRecoilState(userState);
    const [connectionError, setConnectionError] = useRecoilState(connectionErrorState);
    const session = useSession();

    console.log(socket)


    useEffect(()=>{
        if(!socket && session.data?.user.id){
            const ws= new WebSocket(process.env.NEXT_PUBLIC_WSS_URL as string)

            ws.onopen=()=>{
                setSocket(ws)
                setUser(session.data.user)
            }
            ws.onclose = () => {
                setSocket(null);
                
              };

              ws.onerror = () => {
                setSocket(null);
                setConnectionError(true);
              };

        }
        
    },[socket,session.data?.user])

    const sendMessage = (type:any,data:any)=>{
        if(socket){
            socket.send(
                JSON.stringify({
                    type,
                    data
                })
            )
        }
    }
    return { socket, user, sendMessage, connectionError };

}