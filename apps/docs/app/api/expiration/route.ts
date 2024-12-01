import prisma from '@repo/db/client';
import moment from 'moment';
import { NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    const userMemberships = await prisma.userMembership.findMany({
      include: {
        membership: true,
      },
    });
    if (userMemberships) {
      const expiredMemberhsips = userMemberships.filter((membershipDetails) => {
        let duration = membershipDetails.membership.duration;
        let dateJoined = moment(membershipDetails.dateJoined);
        const addMonths = dateJoined.clone().add(duration, 'months');
        const differenceInDays = addMonths.diff(moment(), 'days');
        return differenceInDays <= 0;
      });
      console.log('Expired', expiredMemberhsips);
      await Promise.all(
        expiredMemberhsips.map((membershipDetails) => {
          return prisma.userMembership.update({
            where: {
              userId_membershipId: {
                userId: membershipDetails.userId,
                membershipId: membershipDetails.membershipId,
              },
            },
            data: {
              expired: true,
            },
          });
        })
      );
      return new Response(
        JSON.stringify({ message: 'Expired memberships updated successfully' }),
        { status: 200 }
      );
    }
    return new Response(
      JSON.stringify({ message: 'No memberships to update' }),
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error('Error updating memberships:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
    });
  }
}
