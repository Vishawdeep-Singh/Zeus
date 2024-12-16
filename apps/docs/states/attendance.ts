import { atom } from 'recoil';

type DayEntry = {
  day: string;
  attendance: number;
  members: User[];
};

type User = {
  userId: number;
  userName: string;
  provider: string;
  image?: string | null | undefined;
};

type CachedAttendance = {
  [gymFilterValue: string]: {
    data: DayEntry[] | null;
    expiration: number | null;
  };
};

export const sevenDaysAttendance = atom<CachedAttendance>({
  key: 'sevenDayAttendance',
  default: {},
});
