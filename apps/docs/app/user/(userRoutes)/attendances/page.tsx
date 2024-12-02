import { FloatingDockDemo } from '@/components/floatingDock';
import StylishAttendanceMarker from '@/components/userAttendance';
import { authOptions } from '@/lib/auth';
import prisma from '@repo/db/client';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

export default async function () {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    redirect('/signin');
  }
  const response = await getUsersRegisteredGyms(session.user.id);

  if (response.error) {
    return (
      <div className="text-5xl font-bold text-center">{response.error}</div>
    );
  }
  return (
    <div className=" w-full scroll-smooth h-full">
      <div className="text-center text-4xl p-10 font-bold">Attendances</div>
      <div className="p-10 grid grid-cols-3 gap-7">
        {response.data?.member.map((gymDetails, id) => {
          if (gymDetails.userMemberships.length > 0) {
            return gymDetails.userMemberships
              .filter((membershipData) => !membershipData.expired)
              .map((membershipData) => {
                return (
                  <StylishAttendanceMarker
                    key={gymDetails.id}
                    gymId={gymDetails.id}
                    name={gymDetails.name}
                    address={gymDetails.address}
                  ></StylishAttendanceMarker>
                );
              });
          }
          return null;
        })}
      </div>
      <FloatingDockDemo></FloatingDockDemo>
    </div>
  );
}

async function getUsersRegisteredGyms(id: string) {
  try {
    const response = await prisma.user.findUnique({
      where: {
        id: Number(id),
      },
      select: {
        member: {
          include: {
            userMemberships: {
              where: {
                userId: Number(id),
              },
              select: {
                expired: true,
              },
            },
          },
        },
      },
    });
    // const response2 = await prisma.userMembership.findMany({
    //     where:{
    //         userId:Number(id)
    //     },
    //     select:{
    //         gymId:true
    //     }
    // })

    return { data: response };
  } catch (error) {
    console.error(error);
    return { error: 'Not able to process Attendances at the moment' };
  }
}
