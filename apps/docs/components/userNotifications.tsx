'use client';

import { Bell, TriangleAlert } from 'lucide-react';
import { Button } from './ui/button';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { useRecoilState, useRecoilValue } from 'recoil';
import {
  notificationsState,
  unreadNotificationsSelector,
  warningNotificationsState,
} from '@/states/notifications';
import { ScrollArea } from './ui/scroll-area';
import { Badge } from './ui/badge';
import { set } from 'zod';
import { updateNotifications } from '@/actions/updateNotifications';
import { toast } from 'sonner';
import MultiAvatar from './Multiavatar';
import { useSession } from 'next-auth/react';
import Link from 'next/link';

export const UserNotifications = ({ name }: { name: string }) => {
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
  const warningNotifications = useRecoilValue(warningNotificationsState);
  const unreadNotifications = useRecoilValue(unreadNotificationsSelector);
  console.log('Filtered Notifications', unreadNotifications);
  console.log('Notifications', notifications);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <div className="relative h-14 w-14 hover:border-2 p-[2px] rounded-full border-black hover:cursor-pointer">
          <MultiAvatar className="" name={name}></MultiAvatar>
          {unreadNotifications.length > 0 && (
            <Badge
              variant="destructive"
              className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs"
            >
              {unreadNotifications.length}
            </Badge>
          )}

          {warningNotifications.length > 0 && (
            <Badge className="absolute p-1 rounded-full bg-yellow-500 -top-2 -left-2 h-5 w-5 flex items-center justify-center text-xs">
              {warningNotifications.length}
            </Badge>
          )}
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-80 mr-4">
        <div className="space-y-4">
          <h3 className="font-semibold text-center">Notifications</h3>
          {unreadNotifications.length > 0 || warningNotifications.length > 0 ? (
            <ScrollArea className="h-[300px] pr-4">
              <ol className="space-y-4">
                {warningNotifications.length > 0 &&
                  warningNotifications.map((warningNotification) => {
                    return (
                      <li
                        key={warningNotification.id}
                        className="flex space-x-4"
                      >
                        <div className="flex-shrink-0 w-8 h-8 bg-yellow-500 text-primary-foreground rounded-full flex items-center justify-center font-semibold">
                          <TriangleAlert color="yellow"></TriangleAlert>
                        </div>
                        <div className="flex-grow bg-yellow-400 space-y-2 text-center p-2 rounded-lg">
                          <p className="text-sm">
                            {warningNotification.message}
                          </p>
                          <Link
                            className="border-0"
                            target="_blank"
                            href={`/user/view/${warningNotification.gymId}`}
                          >
                            {' '}
                            <Button className="bg-green-500 hover:bg-green-700">
                              Renew
                            </Button>
                          </Link>
                          {/* <p className="text-xs text-muted-foreground mt-1">{notification}</p> */}
                        </div>
                      </li>
                    );
                  })}
                {unreadNotifications.length > 0 &&
                  unreadNotifications.map((notification, index) => (
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
