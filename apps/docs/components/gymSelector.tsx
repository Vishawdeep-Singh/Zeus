import * as React from "react"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useRecoilState } from "recoil";
import { GymFilterState } from "@/states/filters";

export function SelectGyms() {
    const [filter,setGymFilter] = useRecoilState(GymFilterState)
    const gymNames = [
        "Fitness Hub",
        "Powerhouse Gym",
        "Body Builders",
        "Gym Central",
        "Elite Fitness"
      ];
  return (
    <Select onValueChange={(value) => setGymFilter(value)}>
      <SelectTrigger className="w-[180px] text-gray-500 ">
        <SelectValue placeholder={ filter || "Select a gym" } />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Gyms</SelectLabel>
          {gymNames.map((name,i)=>{
            return <SelectItem key={i}  value={name}>{name}</SelectItem>
          })}
          <SelectItem value={"null"}>None</SelectItem>

        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
