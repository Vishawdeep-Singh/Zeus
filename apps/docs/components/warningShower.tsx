"use client"

import { membershipExpiryWarning } from "@/actions/MemberhsipExpiryWarning/index";
import { useEffect } from "react";
import { toast } from "sonner";


export  function WarningShower({data}:{data:any}) {
    
    useEffect(() => {
        async function checkMemberhshipExpiring(){
            await membershipExpiryWarning(data)
        }
        checkMemberhshipExpiring()
      
      }, [data]); // Re-run effect when userData changes
    
    return <></>
    };
