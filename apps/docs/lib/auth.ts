import db from '@repo/db/client';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcrypt';
import GoogleProvider from 'next-auth/providers/google';
import { NextAuthOptions, User } from 'next-auth';
import { JWT } from 'next-auth/jwt';
import jwt from 'jsonwebtoken';
import { Credentials } from '../types/types';
import prisma from '@repo/db/client';
import { toast } from 'sonner';

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '',
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: {
          label: 'Email Address',
          type: 'email',
          placeholder: 'example@example.com',
        },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials: any) {
        // console.log(credentials);
        // Check if the credentials exist
        // if (!credentials || !credentials.phone || !credentials.password) {
        //   return null;
        // }
        console.log(credentials);

        const existingUser = await db.user.findFirst({
          where: {
            email: credentials?.email,
          },
        });

        if (existingUser) {
          console.log(existingUser.email);

          const passwordValidation = await bcrypt.compare(
            credentials.password,
            existingUser.password as string
          );
          if (passwordValidation) {
            return {
              id: existingUser.id.toString(),
              name: existingUser.name,
              email: existingUser.email,
              number: existingUser.cellPh,
            };
          }
        }

        return null;
      },
    }),
  ],
  cookies: {
    sessionToken: {
      name: 'zeus-auth.session-token',
      options: {
        path: '/',
        httpOnly: true,
        sameSite: 'lax', // Adjust as per your app's requirements
        secure: process.env.NODE_ENV === 'production', // Secure in production
      },
    },
  },

  secret: process.env.JWT_SECRET || 'secret',
  session: {
    strategy: 'jwt',
  },

  callbacks: {
    async jwt({ token, user, account, profile, isNewUser, trigger, session }) {
      if (account?.provider === 'google') {
        const googleuser = await prisma.user.findUnique({
          where: {
            email: profile?.email,
          },
          select: {
            id: true,
            roles: true,
          },
        });

        console.log(user);
        console.log(profile);
        token.provider = 'google';
        token.sub = googleuser?.id.toString();
        token.email = profile?.email;
        token.name = profile?.name;
        token.picture = user?.image as string;
        token.role = googleuser?.roles;
        console.log(token);
      } else if (user) {
        const credentialsuser = await prisma.user.findUnique({
          where: {
            id: Number(user.id),
          },
          select: {
            roles: true,
          },
        });
        token.provider = 'credentials';
        token.sub = user.id;
        token.name = user.name;
        token.email = user.email;
        token.number = user.number;
        token.role = credentialsuser?.roles;
      }
      if (trigger === 'update' && session) {
        token.role = session.user.role;
      }

      return token;
    },
    async session({ session, token, user }) {
      console.log(token);

      if (token.provider === 'google') {
        session.user = {
          id: token.sub as string,
          name: token.name as string,
          email: token.email as string,
          provider: token.provider,
          role: token.role as string,
          image: token.picture,
        };
        return session;
      } else {
        session.user = {
          id: token.sub as string,
          name: token.name as string,
          email: token.email as string,
          provider: token.provider as string,
          role: token.role as string,
          number: token.number as string,
        };
        console.log(session);
        return session;
      }
    },
    async signIn({ user, account, profile, email, credentials }) {
      console.log("User Image",user?.image)

      try {
        if (account?.provider === 'google') {
          const user1 = await prisma.user.findUnique({
            where: {
              email: profile?.email,
            },
          });
          if (user1?.provider === 'credentials') {
            toast.error('Email is Already in use', {
              closeButton: true,
            });
            console.log('gdfadsfasdfads');
            return false;
          }
          if (!user1) {
            const newuser = await prisma.user.create({
              data: {
                email: profile?.email as string,
                name: profile?.name as string,
                cellPh: '',
                provider: 'google',
                image:user.image
              },
            });
          }
          return true;
        }
      } catch (error) {
        console.log(error);
        return false;
      }
      return true;
    },
  },

  pages: {
    signIn: '/signin',
    error: '/error',
  },
};
