// "use client"

// import * as React from "react"
// import { CalendarIcon } from "@radix-ui/react-icons"
// import { format } from "date-fns"

// import { cn } from "@/lib/utils"
// import { Button } from "@/components/ui/button"
// import { Calendar } from "@/components/ui/calendar"
// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from "@/components/ui/popover"

// export function DatePicker() {
//   const [date, setDate] = React.useState<Date>()

//   return (
//     <Popover>
//       <PopoverTrigger asChild>
//         <Button
//           variant={"outline"}
//           className={cn(
//             "w-[240px] justify-start text-left bg-[#f9f9f9] hover:bg-gray-200 font-normal",
//             !date && "text-muted-foreground"
//           )}
//         >
//           <CalendarIcon />
//           {date ? format(date, "PPP") : <span>Pick a date</span>}
//         </Button>
//       </PopoverTrigger>
//       <PopoverContent className="w-auto p-0" align="start">
//         <Calendar
//           mode="single"
//           selected={date}
//           onSelect={setDate}
//           initialFocus
//         />
//       </PopoverContent>
//     </Popover>
//   )
// }
"use client";

import * as React from "react";
import { CalendarIcon } from "@radix-ui/react-icons";
import { addDays, format } from "date-fns";
import { DateRange } from "react-day-picker";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { MasterTableMember } from "@/types/types";
import { useRecoilState } from "recoil";
import { dateRange } from "@/states/filters";


export function DatePicker({
 
  membersData
 // Capture other HTML div attributes
}: {membersData:MasterTableMember[]}) {
  const [date, setDate] = useRecoilState(dateRange);
  console.log(new Date("10/27/2024"));
console.log(membersData)
console.log(date?.from)

  return (
    <div className={cn("grid gap-2")}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-[300px] justify-start text-left font-normal  bg-[#f9f9f9] hover:bg-gray-200",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "LLL dd, y")} -{" "}
                  {format(date.to, "LLL dd, y")}
                </>
              ) : (
                format(date.from, "LLL dd, y")
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={setDate}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
