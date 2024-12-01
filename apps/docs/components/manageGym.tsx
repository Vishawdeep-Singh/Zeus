import loading from '@/app/admin/manageGyms/loading';
import { Gym } from '@/types/types';
import { Label } from '@radix-ui/react-dropdown-menu';
import { LoaderCircle } from 'lucide-react';
import { signIn } from 'next-auth/react';
import Image from 'next/image';
import { Button } from './ui/button';
import AddMembership from './addMembership';
import CardDemo from './blocks/cards-demo-1';
import { MembershipCard } from './membershipCards';
import { MembersofGym } from './membersOfGym';
import { ManageGymHero } from './manageGymsHero';
export const ManageGym = ({
  gymDetails,
  role,
  gymId,
  membershipUserDetails,
}: {
  gymDetails: Gym;
  role: string;
  gymId: string;
  membershipUserDetails?: {
    membershipId: string;
    userId: number;
    expired: Boolean;
  }[];
}) => {
  console.log('Inside Manage Gym', gymDetails);

  return (
    <div className="flex rounded-3xl p-7 flex-col items-center bg-slate-100 mx-0 scroll-smooth space-y-24 bg-muted/40 border shadow-sm">
      <ManageGymHero
        image={gymDetails?.image}
        address={gymDetails?.address as string}
        name={gymDetails?.name as string}
      />
      {role !== 'user' && (
        <div className="flex justify-center">
          <AddMembership
            gymName={gymDetails?.name as string}
            gymId={gymDetails?.id as string}
          />
        </div>
      )}

      <div className="space-y-10 p-10 ">
        <div className="text-4xl text-center">Memberships</div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 items-center">
          {gymDetails?.memberships?.map((data, i) => {
            return (
              <MembershipCard
                membershipUserDetails={membershipUserDetails}
                key={i}
                gymId={gymId}
                index={1}
                id={data.id as string}
                color={data.color}
                duration={data.duration}
                price={data.price}
                description={data.description as string[]}
              ></MembershipCard>
            );
          })}
        </div>
      </div>

      {role !== 'user' && (
        <div className="w-[70%]">
          <div className="text-4xl w-full space-y-7  ">
            <div className="text-center text-primary font-bold">
              Members of this Gym
            </div>
            <MembersofGym
              membersDetails={gymDetails?.members}
              owner={gymDetails?.ownerId}
            ></MembersofGym>
          </div>
        </div>
      )}
    </div>
  );
};

// <div className="flex items-center justify-center font-mono font-bold text-9xl">
//         {gymDetails?.name}
//       </div>
//       <div className="space-y-5">
//         <Image
//           src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=2560&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
//           alt="Description of image"
//           width={1000}
//           height={1000}
//           className=" h-96 w-96 object-cover rounded-xl"
//         ></Image>
//         <div className="text-xl">{gymDetails?.address}</div>
//       </div>
