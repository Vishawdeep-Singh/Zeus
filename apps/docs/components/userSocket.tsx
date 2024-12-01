'use client';

import { getPurchasedGymsOfUser } from '@/actions/getPurchasedGyms';
import { useWebSocket } from '@/context/socketContext';
import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { useWarningNotifications } from '@/hooks/useWarningNotifications';

export function UserSocket({ children }: any) {
  const { socket, user } = useWebSocket();
  const [gymIds, setGymIds] = useState<string[]>([]);
  const warningNotifications = useWarningNotifications();

  useEffect(() => {
    async function fetchGymIds() {
      const response = await getPurchasedGymsOfUser();
      if (response.error) {
        toast.error(`${response.error}`, {
          closeButton: true,
          position: 'top-center',
        });
      } else {
        setGymIds(response.data as []);
      }
    }
    fetchGymIds();
  }, []);

  useEffect(() => {
    if (user && socket && gymIds?.length > 0) {
      socket.send(
        JSON.stringify({
          type: 'join-notifications-user',
          data: {
            gymIds: gymIds,
            userId: user.id,
          },
        })
      );
    }
  }, [user, socket, gymIds]);

  return <>{children}</>;
}
