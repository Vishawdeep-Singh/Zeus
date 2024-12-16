import { Zap } from 'lucide-react';
import { Button } from './ui/button';
import moment from 'moment';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import MultiAvatar from './Multiavatar';
import Image from 'next/image';
import Link from 'next/link';

export async function MembersofGym({ membersDetails, owner }: any) {
  const session = await getServerSession(authOptions);

  return (
    <div className=" h-96 w-full mx-auto overflow-y-auto bg-transparent border-none bg-opacity-100 shadow-sm hover:border hover:shadow-2xl hover:shadow-primary/30  hover:scale-105 transition-all  duration-300 hover:bg-white rounded-xl border p-4">
      <div className="grid grid-cols-3 gap-4 items-center content-center w-full ">
        {membersDetails.map((member: any, i: any) => {
          let JoinedDate = moment(member.memberships?.[0].dateJoined).format(
            'DD/MM/YYYY'
          );

          const originalDate = moment(member.memberships?.[0].dateJoined);

          const monthsToSubtract = member.memberships?.[0].membership.duration;
          const addMonths = originalDate
            .clone()
            .add(monthsToSubtract, 'months');
          // Number of months to subtract

          // Calculate the difference in days
          const differenceInDays = addMonths.diff(moment(), 'days');

          return (
            <Popover key={i}>
              <PopoverTrigger>
                <div className=" p-5 flex rounded-lg text-lg hover:bg-slate-50 space-x-5 items-center">
                  {member.provider === 'google' ? (
                    <Image
                      src={member.image as string}
                      className="h-12 w-12 flex-shrink-0 rounded-full"
                      width={50}
                      height={50}
                      alt="Avatar"
                      priority
                    />
                  ) : (
                    <MultiAvatar
                      name={member.name as string}
                      className="h-12 w-12"
                    ></MultiAvatar>
                  )}
                  <div>
                    <p>{member.name}</p>
                    {member.id == owner && (
                      <p className="text-sm text-start">Gym owner</p>
                    )}
                  </div>
                </div>
              </PopoverTrigger>

              <PopoverContent className="shadow-lg border border-gray-200 rounded-lg p-5 bg-white max-w-sm">
                <div className="flex flex-col space-y-4">
                  {/* Top section with profile and icon */}
                  <div className="flex justify-between items-center">
                    {/* Profile section */}
                    <div className="flex items-center space-x-3">
                      {member.provider === 'google' ? (
                        <Image
                          src={member.image as string}
                          className="h-12 w-12 flex-shrink-0 rounded-full"
                          width={50}
                          height={50}
                          alt="Avatar"
                          priority
                        />
                      ) : (
                        <MultiAvatar
                          name={member.name as string}
                          className="h-12 w-12"
                        ></MultiAvatar>
                      )}
                      <div className="text-sm font-semibold text-gray-800">
                        {member.name}
                      </div>
                    </div>
                    {/* Icon section */}
                    <div>
                      <Zap
                        fill={member.memberships?.[0].membership.color}
                        className="h-6 w-6"
                      ></Zap>
                    </div>
                  </div>

                  {/* Additional Information */}
                  <div className="text-gray-600 text-sm">
                    <div>
                      <strong>Id:</strong> {member.id}
                    </div>
                    <div>
                      <strong>Email:</strong> {member.email}
                    </div>
                    <div>
                      <strong>Phone:</strong> {member.cellPh}
                    </div>
                    <div>
                      <strong>Joined:</strong> {JoinedDate}
                    </div>
                    <div>
                      <strong>Days Left:</strong> {differenceInDays}
                    </div>
                    <div>
                      <strong>Membership:</strong>{' '}
                      {member.memberships?.[0].membership.duration} months , Rs.{' '}
                      {member.memberships?.[0].membership.price}
                    </div>
                  </div>
                  <Link href={`/profile?userId=${member.id}`}>
                    <Button>View Profile</Button>
                  </Link>
                </div>
              </PopoverContent>
            </Popover>
          );
        })}
      </div>
    </div>
  );
}
