"use client";

// import { useRef, useState } from "react";
// import Image from "next/image";
// import { AnimatePresence, motion } from "framer-motion";
// import { cn } from "@/lib/utils";
import { DirectionAwareHover } from "./ui/direction-aware-hover";

export function ManageGymHero({address, name}:{ 
  address: string,
  name: string
}) {
  const imageUrl =
    "https://images.unsplash.com/photo-1507398941214-572c25f4b1dc?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGd5bXxlbnwwfHwwfHx8MA%3D%3D";
  return (
    <div className="h-full w-full relative  flex items-center justify-center">
      <DirectionAwareHover imageUrl={imageUrl} >
        <p className="font-bold text-6xl font-mono">{name}</p>
        <p className="font-normal mt-2"> <span className="italic text-lg">{address}</span></p>
      </DirectionAwareHover>
    </div>
  );
}
