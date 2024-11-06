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
export const GymFilter=()=>{
    return (
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Choose a gym" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Gyms</SelectLabel>
              <SelectItem value="apple">Muscles Gym</SelectItem>
              <SelectItem value="banana">Banana</SelectItem>

            </SelectGroup>
          </SelectContent>
        </Select>
      )
}