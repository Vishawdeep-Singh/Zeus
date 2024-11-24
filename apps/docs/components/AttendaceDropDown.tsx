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
  
  export function AttendanceDropDown({attendances}: {attendances: string[]}) {
    console.log('demon attendance' ,attendances)
    const parsedAttendances = attendances.map(dateStr => {
        const [month, day, year] = dateStr.split("/").map(Number);
        return new Date(Number(year), Number(month) - 1, day);
    });
    
    const allatt = parsedAttendances
        .sort((a, b) => b.getTime() - a.getTime()) // Directly compare Date objects
        .map(date => date.toDateString()); // Convert back to readable format
    
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost"><Calendar />Attendances</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56 overflow-auto">
          <DropdownMenuLabel>All Attendances</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup className="overflow-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:w-0" >
            {allatt.map((date, i)=> (
                <DropdownMenuItem key={i} >
                <span>{date}</span>
              </DropdownMenuItem>
            ))}
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    )
  }
  