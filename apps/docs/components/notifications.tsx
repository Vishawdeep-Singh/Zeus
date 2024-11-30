'use client';

import { Bell } from 'lucide-react';
import { Button } from './ui/button';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { useRecoilState, useRecoilValue } from 'recoil';
import {
  notificationsState,
  unreadNotificationsSelector,
} from '@/states/notifications';
import { ScrollArea } from './ui/scroll-area';
import { Badge } from './ui/badge';
import { set } from 'zod';
import { updateNotifications } from '@/actions/updateNotifications';
import { toast } from 'sonner';

export const Notifications = () => {
  async function handleClick() {
    const notificationIds = unreadNotifications.map(
      (notification) => notification.id
    );
    setNotifications((prev) =>
      prev.map(
        (notification) =>
          notificationIds.includes(notification.id)
            ? { ...notification, isRead: true } // Update isRead to true
            : notification // Keep the original notification
      )
    );
    const response = await updateNotifications(notificationIds);
    if (response.error) {
      toast.error(`${response.error}`, {
        closeButton: true,
        position: 'top-center',
      });
    }
  }
  const [notifications, setNotifications] = useRecoilState(notificationsState);
  const unreadNotifications = useRecoilValue(unreadNotificationsSelector);
  console.log('Filtered Notifications', unreadNotifications);
  console.log('Notifications', notifications);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="relative hover:bg-slate-800"
        >
          <Bell className="h-5 w-5" color="white" />
          {unreadNotifications.length > 0 && (
            <Badge
              variant="destructive"
              className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs"
            >
              {unreadNotifications.length}
            </Badge>
          )}
          <span className="sr-only">Notifications</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 mr-4">
        <div className="space-y-4">
          <h3 className="font-semibold text-center">Notifications</h3>
          {unreadNotifications.length > 0 ? (
            <ScrollArea className="h-[300px] pr-4">
              <ol className="space-y-4">
                {unreadNotifications.map((notification, index) => (
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
            <p className="text-sm text-center text-muted-foreground">
              No new notifications
            </p>
          )}
          <Button
            onClick={handleClick}
            disabled={unreadNotifications.length === 0}
            variant="outline"
            className="w-full"
          >
            Mark all as read
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};
