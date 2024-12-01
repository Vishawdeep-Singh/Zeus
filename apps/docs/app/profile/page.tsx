import { authOptions } from '@/lib/auth';
import prisma from '@repo/db/client';
import { getServerSession } from 'next-auth';
import { notFound, redirect } from 'next/navigation';
import Image from 'next/image';
import MultiAvatar from '@/components/Multiavatar';
import Link from 'next/link';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@radix-ui/react-avatar';
import { ExternalLink, MapPin, Dumbbell, Badge } from 'lucide-react';
import { Button } from 'react-day-picker';

export default async function UserProfilePage({
  searchParams,
}: {
  searchParams: { userId: string };
}) {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect('/');
  }

  const userId = searchParams.userId;
  const userIdNumber = Number(userId);
  if (isNaN(userIdNumber)) {
    notFound();
  }

  const user = await getUser(Number(userId), Number(session.user.id));

  return (
    <div className="container mx-auto p-4">
      <Card className="max-w-4xl mx-auto overflow-hidden transition-all duration-300 ease-in-out hover:shadow-lg">
        <div className="relative h-48 bg-gradient-to-r from-pink-300 to-blue-400 dark:from-slate-700 dark:to-slate-800">
          <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-background to-transparent"></div>
        </div>
        <CardHeader className="relative pb-0">
          <div className="flex flex-col sm:flex-row items-center">
            <Avatar className="w-32 h-32 border-4 border-background -mt-16 relative z-10 transition-transform duration-300 ease-in-out hover:scale-105 rounded-full">
              {user?.provider ==="google" ?  <Image
                          src={user.image as string}
                          className="rounded-full object-cover"
                          width={1000}
                          height={1000}
                          alt="Avatar"
                        /> :    <MultiAvatar name={user?.name as string} />}
           
              {/* <AvatarFallback>{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback> */}
            </Avatar>
            <div className="mt-4 sm:mt-0 sm:ml-6 text-center sm:text-left">
              <h1 className="text-3xl font-bold">{user?.name}</h1>
              <p className="text-muted-foreground">+91 {user?.cellPh}</p>
              <p className="text-muted-foreground">{user?.email}</p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-6 space-y-6">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold text-slate-700 dark:text-slate-200">
                Gyms Joined
              </h2>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {user?.member.map((gym) => (
                <Link href={`/profile/${gym.id}?userId=${userId}`}>
                  <Card
                    key={gym.id}
                    className="bg-slate-50 dark:bg-slate-800 overflow-hidden transition-all duration-300 ease-in-out hover:shadow-md hover:-translate-y-1"
                  >
                    <CardContent className="p-4">
                      <h3 className="font-bold text-lg mb-2 text-slate-800 dark:text-slate-200">
                        {gym.name}
                      </h3>
                      <div className="flex items-center text-sm text-muted-foreground mb-2">
                        <MapPin className="w-4 h-4 mr-1" />
                        {gym.address}
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

async function getUser(userId: number, ownerId: number) {
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    include: {
      member: {
        where: {
          ownerId: Number(ownerId),
        },
        select: {
          id: true,
          name: true,
          address: true,
        },
      },
    },
  });
  return user;
}
