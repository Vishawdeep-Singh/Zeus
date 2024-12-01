'use client';

import { membershipExpiryWarning } from '@/actions/MemberhsipExpiryWarning/index';
import { warningNotificationsState } from '@/states/notifications';
import { WarningNotification } from '@/types/types';
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { toast } from 'sonner';

export function WarningShower({ data }: { data: any }) {
  const [warningNotifications, setWarningNotifications] = useRecoilState(
    warningNotificationsState
  );
  useEffect(() => {
    async function checkMemberhshipExpiring() {
      const notifications: WarningNotification[] =
        await membershipExpiryWarning(data);

      if (notifications.length > 0) {
        setWarningNotifications((prevNotifications) => {
          const updatedNotifications = [...prevNotifications];

          notifications.forEach((newNotification) => {
            const existingNotificationIndex = updatedNotifications.findIndex(
              (notification) =>
                notification.userId === newNotification.userId &&
                notification.gymId === newNotification.gymId &&
                notification.message === newNotification.message
            );

            if (existingNotificationIndex === -1) {
              updatedNotifications.push(newNotification);
            } else {
              updatedNotifications[existingNotificationIndex] = {
                ...updatedNotifications[existingNotificationIndex],
                message: newNotification.message,
              };
            }
          });

          return updatedNotifications;
        });
      }
    }
    checkMemberhshipExpiring();
  }, [data]); // Re-run effect when userData changes

  return <></>;
}
