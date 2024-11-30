import NextAuth from 'next-auth';
import { DefaultSession } from 'next-auth';

declare module 'next-auth' {
  interface User {
    number?: string;
  }

  interface Session {
    user: User & {
      number?: string;
      provider?: string;
      role?: string;
    };
  }
}
