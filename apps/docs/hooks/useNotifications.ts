"use client"

import { getNotifications } from "@/actions/getNotificatios";
import { notificationsState } from "@/states/notifications"
import { userState } from "@/states/socket";
import { useEffect } from "react";
import { useRecoilState } from "recoil"
import { toast } from "sonner";


export const useNotifications=()=>{
    const [notifications,setNotifications]=useRecoilState(notificationsState);
   


   

    useEffect(() => {
      if (notifications.length === 0) { 
        const fetchNotifications = async () => {
          try {
            const response = await getNotifications();
        if(response.data){
            setNotifications((prev) => [...prev,...response.data]);
        } else{
            toast.error(`${response.error}`,{
                position:"top-center"
            })
        }
           
          } catch (error) {
            console.error('Error fetching notifications:', error);
            setNotifications([]);
          }
        };
  
        fetchNotifications();
      }
    }, []);
  
    return notifications;
}