"use client"

import { signOut } from "next-auth/react"

export const UserLogOut=()=>{
    return<button onClick={()=>{
        signOut()
    }} className="px-3 py-1 rounded-xl border border-neutral-600 text-black bg-white hover:bg-gray-100 transition duration-200">
    Log Out
</button>
}