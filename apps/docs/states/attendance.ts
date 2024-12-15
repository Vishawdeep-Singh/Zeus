import { atom } from 'recoil';


type DayEntry = {
  day: string;
  attendance: number;
  members: User[];
};

type User = {
  userId: Number;
  userName: string;
  provider: string;
  image?: string | null | undefined;
};

type Custom = {
  data: DayEntry[] | null;
  expiration: number | null; 
};


export const sevenDaysAttendance = atom<Custom>({
  key: 'sevenDayAttendance', 
  default: {
    data: null,
    expiration: null,
  },
});
