import { Calendar } from "lucide-react"
  
  import { Button } from "@/components/ui/button"
  import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import { dateRange } from "@/states/filters";
import { useRecoilValue } from "recoil";
import { useEffect, useState } from "react";
  
  export function AttendanceDropDown({attendances}: {attendances: string[]}) {
    const dateFilter = useRecoilValue(dateRange);
    const [filteredAttendances,setFilteredAttendances] = useState<string[]>([]);

    useEffect(()=>{
      if(attendances.length>0 && dateFilter){
        const parsedAttendances = attendances.map(dateStr => {
          return new Date(dateStr);

         
      });
      const filteredAttendancesData = parsedAttendances.filter((date)=>{
        if(dateFilter.from && !dateFilter.to){
          return date.toDateString()===dateFilter.from.toDateString()
        }
        else if(dateFilter.from && dateFilter.to){
          return dateFilter.from <= date && date<= dateFilter.to
        }
      }).sort((a, b) => b.getTime() - a.getTime()) 
      .map(date => date.toDateString());

      setFilteredAttendances(filteredAttendancesData)
      
      }
    },[dateFilter,attendances])

  
    
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost"><Calendar />Attendances</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56 overflow-auto">
          <DropdownMenuLabel>All Attendances</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup className="overflow-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:w-0" >
            {filteredAttendances.map((date, i)=> (
                <DropdownMenuItem key={i} >
                <span>{date}</span>
              </DropdownMenuItem>
            ))}
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    )
  }
  