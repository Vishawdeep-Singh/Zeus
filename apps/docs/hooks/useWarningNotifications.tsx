"use client"

import { useRecoilState } from "recoil";

import {warningNotificationsState} from '@/states/notifications'
import { useEffect } from "react";
import { getwarningNotifications } from "@/actions/getWarningNotifications";
import { toast } from "sonner";


export const useWarningNotifications =()=>{
    const [warningNotifications,setWarningNotifications]=useRecoilState(warningNotificationsState);

    useEffect(()=>{
        const fetchWarningNotifications=async()=>{
            const warningNotifications = await getwarningNotifications()
            if(warningNotifications.error){
                toast.error(`${warningNotifications.error}`,{
                    position:"top-center"
                })
                return
            }
            else if(warningNotifications.data && warningNotifications.data.length>0){
                setWarningNotifications(warningNotifications.data)
            }
        }
        if(warningNotifications.length===0){
            fetchWarningNotifications()
        }
       
       
    },[])
    return warningNotifications
}