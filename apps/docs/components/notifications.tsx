"use client"

import { Bell } from "lucide-react"
import { Button } from "./ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover"
import { useRecoilState } from "recoil"
import { notificationsState } from "@/states/notifications"
import { ScrollArea } from "./ui/scroll-area"

export const Notifications=()=>{
    const [notifications,setNotifications]=useRecoilState(notificationsState)
    console.log(notifications)
   return <Popover>
    <PopoverTrigger asChild>
      <Button variant="ghost"  size="icon" className="relative hover:bg-slate-800">
        <Bell className="h-5 w-5"  color="white" />
        <span className="sr-only">Notifications</span>
      </Button>
    </PopoverTrigger>
    <PopoverContent className="w-80 mr-4">
    <div className="space-y-4">
                  <h3 className="font-semibold text-center">Notifications</h3>
                  {notifications.length > 0 ? (
                    <ScrollArea className="h-[300px] pr-4">
                      <ol className="space-y-4">
                        {notifications.map((notification, index) => (
                          <li key={notification.id} className="flex space-x-4">
                            <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-semibold">
                              {index + 1}
                            </div>
                            <div className="flex-grow">
                              <p className="text-sm">{notification.message}</p>
                              {/* <p className="text-xs text-muted-foreground mt-1">{notification}</p> */}
                            </div>
                          </li>
                        ))}
                      </ol>
                    </ScrollArea>
                  ) : (
                    <p className="text-sm text-center text-muted-foreground">No new notifications</p>
                  )}
                  <Button  variant="outline" className="w-full">
                    Mark all as read
                  </Button>
                </div>
    </PopoverContent>
  </Popover>
}