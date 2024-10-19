

import { Link } from "lucide-react"
import { CardBody, CardContainer, CardItem } from "./ui/3d-card"
import Image from "next/image";
import { HoverEffect } from "./ui/card-hover-effect";
import { Gym } from "@/types/types";



export const ManageGyms=({gyms}:{gyms:Gym[]})=>{
 
      return (
        <div className=" bg-slate-100  rounded-xl px-4 py-14 h-auto">
          <HoverEffect items={gyms} />
        </div>
      );
}