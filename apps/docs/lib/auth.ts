import db from '@repo/db/client';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcrypt';
import GoogleProvider from "next-auth/providers/google";
import { NextAuthOptions, User } from 'next-auth';
import { JWT } from 'next-auth/jwt';
import jwt from 'jsonwebtoken';
import { Credentials } from '../types/types';
import prisma from '@repo/db/client';


export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? ""
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        phone: {
          label: 'Phone number',
          type: 'text',
          placeholder: '1231231231',
        },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials:any) {
        // console.log(credentials);
        // Check if the credentials exist
        // if (!credentials || !credentials.phone || !credentials.password) {
        //   return null;
        // }
        console.log(credentials)


        
        const existingUser = await db.user.findFirst({
          where: {
            cellPh: credentials?.phone,
          },
        });

        if (existingUser) {
          console.log(existingUser.cellPh);
          // Compare the provided password with the stored hashed password
          const passwordValidation =  await bcrypt.compare(
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
//   cookies: {
//     sessionToken: {
//       name: 'next-auth.session-token-user-app',
//       options: {
//         path: '/',
//         httpOnly: true,
//         sameSite: 'lax',
//         secure: process.env.NODE_ENV==="production",
//       },
//     },
//   },

  secret: process.env.JWT_SECRET || 'secret',
  
  callbacks: {
    async jwt({ token, user, account, profile, isNewUser }) {

    
    if(account?.provider === "google"){
      const googleuser= await prisma.user.findUnique({
        where:{
          email:profile?.email
        },
        select:{
          id:true
        }
      })

      console.log(user)
      console.log(profile)
      token.provider="google"
      token.sub=googleuser?.id.toString();
      token.email=profile?.email
      token.name=profile?.name
      token.picture=user?.image as string
      token.role="ADMIN"
      console.log(token)
      return token;
    }
  else if(user) {
        token.provider = "credentials";
        token.sub=user.id
        token.name = user.name;
        token.email = user.email;
        token.number=user.number;
        token.role="ADMIN"
        return token;
    }

      return token;
    
  },
    async session({ session, token , user}) {
     console.log(token)

      if (token.provider==="google") {
        session.user = {
          id: token.sub as string,
          name: token.name as string,
          email: token.email as string,
          provider: token.provider,
          role:token.role as string,
          image:token.picture

        };
        return session
      }
      else{
        session.user = {
          id: token.sub as string,
          name: token.name as string,
          email: token.email as string,
          provider: token.provider as string,
          role:token.role as string,
          number:token.number as string

        };
        return session
      }

    },
    async signIn({ user, account, profile, email, credentials }) {
      try {
        if(account?.provider==="google"){
          const user= await prisma.user.findUnique({
            where:{
              email:profile?.email
            }
          })
          if(!user){
            const newuser=await prisma.user.create({
              data:{
                email:profile?.email as string,
                name:profile?.name as string,
                cellPh:'',
                roles:{
                  create:{
                    roleName:"ADMIN"
                  }
                }

              }
            })

          }
          return true
        }
      } catch (error) {
        console.log(error);
        return false
        
      }
      return true
      
    },
  },

  pages: {
    signIn: '/signin',
  },
}

