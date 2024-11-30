"use client"
import BeatLoader from "react-spinners/BeatLoader";
export default function Loading(){
    return <div className="flex items-center justify-center h-screen w-full">
        <BeatLoader loading={true} color="black"></BeatLoader>
        </div>
}