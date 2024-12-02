import { atom, selector } from 'recoil';
import { Notification, WarningNotification } from '@/types/types';

export const notificationsState = atom<Notification[]>({
  key: 'notificationsState',
  default: [],
});

export const unreadNotificationsSelector = selector({
  key: 'unreadNotificationsSelector',
  get: ({ get }) => {
    const notifications = get(notificationsState);

    return notifications.filter((notification) => !notification.isRead);
  },
});

export const userNotificationsSelector = selector({
  key: 'userNotificationsSelector',
  get: ({ get }) => {
    const notification = get(unreadNotificationsSelector);

    return notification.filter((notification) => notification.type === 'USER');
  },
});

export const warningNotificationsState = atom<WarningNotification[]>({
  key: 'warningNotificationsState',
  default: [],
});
