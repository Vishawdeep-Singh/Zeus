"use client"
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Button } from "./button";
import { Gym } from "@/types/types";

export const HoverEffect = ({
  items,
  className,
}: {
  items: Gym[];
  className?: string;
}) => {
  let [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div
      className={cn(
        "grid grid-cols-1 md:grid-cols-2  lg:grid-cols-2 gap-6 py-2",
        className
      )}
    >
      {items.map((item, idx) => (
        <Link
          href= {`/admin/manageGyms/${item?.id}`}
          key={item?.id}
         
          className="relative group  block p-2 h-full w-full"
          onMouseEnter={() => setHoveredIndex(idx)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <AnimatePresence>
            {hoveredIndex === idx && (
              <motion.span
                className="absolute inset-0 h-full w-full bg-neutral-200 dark:bg-slate-800/[0.8] block  rounded-3xl"
                layoutId="hoverBackground"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 1,
                  transition: { duration: 0.15 },
                }}
                exit={{
                  opacity: 0,
                  transition: { duration: 0.15, delay: 0.2 },
                }}
              />
            )}
          </AnimatePresence>
          <Card>
            <CardTitle>{item?.name}</CardTitle>
            {/* <CardImage></CardImage> */}
            <div className="h-80 w-full bg-cover bg-center rounded-xl"
            style={{backgroundImage : 'url(https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=2560&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)'}} 
            ></div>
            <CardDescription phoneNumber={item?.phoneNumber as string}>{item?.address}</CardDescription>
          </Card>
        </Link>
      ))}
    </div>
  );
};

export const Card = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "rounded-2xl h-full w-full p-4 overflow-hidden bg-transparent text-black border-transparent group-hover:border-slate-700 relative z-20",
        className
      )}
    >
      <div className="relative z-50">
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
};
export const CardTitle = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <h4 className={cn("text-black text-4xl text-center font-bold tracking-wide  mb-4", className)}>
      {children}
    </h4>
  );
};
// export const CardImage = ({
//   className,

// }: {
//   className?: string;
 
// }) => {
//   return (
//   <Image src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=2560&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
//   alt="Description of image"
//   width={1000}
//   height={1200}
//   className=" h-60 w-full object-cover rounded-xl"></Image>
//   );
// };
export const CardDescription = ({
  className,
  children,
  phoneNumber
}: {
  className?: string;
  children: React.ReactNode;
  phoneNumber:string
}) => {
  return (
    <div className="font-bold" >
    <p
      className={cn(
        "mt-4 text-black tracking-wide leading-relaxed text-md",
        className
      )}
    >
      {children}
    </p>
    <p className=" text-black tracking-wide leading-relaxed text-md">
      +91 {phoneNumber}
    </p>
    </div>

  );
};
