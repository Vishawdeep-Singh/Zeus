import { addFormSchema } from './validations';
import { z } from 'zod';
export type SignUp = {
  name: string;
  email: string;
  cellPh: string;
  password?: string;
};

export type User = {};

export type SignIn = Pick<SignUp, 'email' | 'password'>;

export type Credentials = {
  phone: string;
  password: string;
  csrfToken: string;
  callbackUrl: string;
  json: string;
  redirect: string;
};

export type AddGym = {
  name: string;
};

export type Gym = {
  name: string;
  address: string;
  phoneNumber: string;
  image: string | null;
  id: string;
  ownerId: number;
  memberships?: MembershipAction[];
  members?: Member[];
} | null;

export type TAddForm = z.infer<typeof addFormSchema>;

export type Membership = {
  id?: string;
  duration: Number;
  price: string;
  color: string;
  description?: string;
};
export type MembershipAction =
  | {
      id?: string;
      duration: Number;
      price: string;
      color: string;
      description?: string[];
      users?: UserMembership[];
    }
  | {
      id?: string;
      duration: Number;
      price: string;
      color: string;
      description?: string[];
      gymId: string;
      users?: UserMembership[];
    };

export type MembershipCardProps = {
  id: string;
  price: string;
  duration: Number;
  description: string[];
  color: string;
  index: number;
  gymId: string;
  membershipUserDetails:
    | { membershipId: string; userId: number; expired: Boolean }[]
    | undefined;
};

export type Member = {
  id: number;
  name: string;
  email: string;
  cellPh: string;
  password: string | null;
  provider: string;
  memberships: UserMembership[];
};

export type UserMembership = {
  userId: number;
  membershipId: string;
  dateJoined: Date;
  gymId: string;
  membership?: MembershipAction;
};

export type Notification = {
  id: string;
  userId: number;
  message: string;
  createdAt: Date;
  isRead: boolean;
  type: 'ADMIN' | 'USER';
};

interface Attendance {
  id: string;
  gymId: string;
  userId: number;
  date: string;
  time: string;
}

interface Membership1 {
  gymId: string;
  membershipId: string;
  dateJoined: string;
  expired: Boolean;
  membership: {
    duration: number;
  };
}

interface Member1 {
  id: number;
  name: string;
  email: string;
  cellPh: string;
  memberships: Membership1[];
  attendance: Attendance[];
}

export interface Gym1 {
  id: string;
  name: string;
  members: Member1[];
}
export interface MasterTableMember {
  id: number;
  name: string;
  email: string;
  phone: string;
  gymName: string;
  membershipDuration: number;
  daysLeft: number;
  attendance: string[];
}
export type GymsData = Gym1[];

export type AttendanceData = {
  userId: number;
  date: string;
  time: string;
  users: {
    name: string;
    provider: string;
    image?: string | null | undefined;
  };
};

export type Attendances = {
  id: string;
  attendance: AttendanceData[];
};

export type ExpiredMembers = {
  id: number;
  name: string;
  email: string;
  phoneNumber: string;
  membershipDuration: number;
  expiredOn: string;
};

export type WarningNotification = {
  gymId?: string;
  id?: string;
  userId?: number;
  message?: string;
  resolved?: boolean;
};
