'use client';

// import { useRef, useState } from "react";
// import Image from "next/image";
// import { AnimatePresence, motion } from "framer-motion";
// import { cn } from "@/lib/utils";
import { DirectionAwareHover } from './ui/direction-aware-hover';

export function ManageGymHero({
  address,
  name,
  image,
}: {
  address: string;
  name: string;
  image: string | null | undefined;
}) {
  let imageUrl =
    'https://images.unsplash.com/photo-1623874514711-0f321325f318?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D;';

  if (image) {
    imageUrl = image;
  }
  return (
    <div className="h-full w-full relative  flex items-center justify-center">
      <DirectionAwareHover imageUrl={imageUrl}>
        <p className="font-bold text-6xl font-mono">{name}</p>
        <p className="font-normal mt-2">
          {' '}
          <span className="italic text-lg">{address}</span>
        </p>
      </DirectionAwareHover>
    </div>
  );
}
