import { addFormSchema } from "./validations";
import {z} from "zod"
export type SignUp = {
    name: string;
    email: string;
    cellPh: string;
    password?: string;
  };

  export type SignIn = Pick<SignUp, 'email' | 'password'>;

  export type Credentials ={
        phone:string
        password:string
        csrfToken: string
        callbackUrl: string,
        json: string,
        redirect:string
      
  }

  export type AddGym = {
      name:string,

  }

  export type Gym={
    name: string;
    address: string;
    phoneNumber: string;
    id: string;
    ownerId: number;
    memberships?:MembershipAction[];
    members?: Member[]
  } | null

  export type TAddForm =  z.infer<typeof addFormSchema>

  export type Membership= {
    id?:string
    duration:Number,
    price:string,
    color:string,
    description?:string
  }
  export type MembershipAction= {
    id?:string
    duration:Number,
    price:string,
    color:string,
    description?:string[],
    users?:UserMembership[]
  } | {
    id?:string
    duration:Number,
    price:string,
    color:string,
    description?:string[],
    gymId:string
  }

  export type MembershipCardProps = {
    price: string;
    duration: Number;
    description: string[];
    color:string,
    index:number
  };

  export type Member = {
    id: number,
    name: string,
    email: string,
    cellPh: string,
    password: string | null,
    provider: string,
    memberships:UserMembership[]
  }

  export type UserMembership={
    userId:number,
    membershipId:string,
    dateJoined:Date
    gymId:string,
    membership?: MembershipAction

  
  
  } 
