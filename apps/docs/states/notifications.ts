import { getNotifications } from "@/actions/getNotificatios";
import { atom, selector } from "recoil";
import { Notification } from "@/types/types";

export const notificationsState = atom<Notification[]>({
    key: 'notificationsState',
    default: []
  });

  export const unreadNotificationsSelector = selector({
    key: 'unreadNotificationsSelector',
    get: ({ get }) => {
      const notifications = get(notificationsState);
      
      return notifications.filter(notification => !notification.isRead);
    },
  });