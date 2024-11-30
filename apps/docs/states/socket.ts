// state/socketAtom.js
import { Session, User } from 'next-auth';
import { atom } from 'recoil';

export const socketState = atom<WebSocket | null>({
  key: 'socketState', // unique ID (with respect to other atoms/selectors)
  default: null, // default value (aka initial value)
});

export const userState = atom<User | null>({
  key: 'userState',
  default: null,
});

export const connectionErrorState = atom({
  key: 'connectionErrorState',
  default: false,
});

export const loadingState = atom<boolean>({
  key: 'loadingState',
  default: true,
});
