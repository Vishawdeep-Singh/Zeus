import Image from 'next/image';
import { Tabs } from './ui/tabs';
import Component from './attendanceWeeks';
import { Component1 } from './revenueMonths';
import { Component2 } from './todayAttendance';
import { MembersofGym } from './membersOfGym';
import Component3 from './membershipExpiry';
import { MasterTable } from './masterTable';
import { GymFilter } from './gymFilter';
import { GymsData, MasterTableMember } from '@/types/types';

export function TabsDemo({
  masterTableData,
  ownedGyms,
  membershipExpiry,
}: {
  masterTableData: MasterTableMember[];
  ownedGyms: { gymId: string; gymName: string }[];
  membershipExpiry: GymsData;
}) {
  console.log('In Tabs', masterTableData);
  console.log('Owned', ownedGyms);
  console.log('Membership Expiry', membershipExpiry);
  const tabs = [
    {
      title: 'Analytics',
      value: 'product',
      content: (
        <div className="w-full space-y-10  overflow-hidden  relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-black bg-gradient-to-br bg-white  border-black ">
          <div className="flex space-x-10 w-full items-center">
            <p>Analytics</p>
            <div>
              <GymFilter ownedGyms={ownedGyms}></GymFilter>
            </div>
          </div>

          <div className="flex  space-y-10 flex-col ">
            <div className="flex flex-wrap space-x-5">
              <Component></Component>
              <Component1></Component1>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: 'Membership Expiry',
      value: 'services',
      content: (
        <div className="w-full space-y-10 overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-primary bg-gradient-to-br  bg-white  ">
          <p>Membership Expiry</p>
          <div className=" flex flex-col space-y-5">
            <GymFilter ownedGyms={ownedGyms}></GymFilter>
            <Component3 membershipExpiry={membershipExpiry}></Component3>
          </div>
        </div>
      ),
    },
    {
      title: "Today's Visits",
      value: "Today's Visits",
      content: (
        <div className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-br  bg-white ">
          <div className="flex text-black justify-center p-5">
            <GymFilter ownedGyms={ownedGyms}></GymFilter>
          </div>
          <Component2></Component2>
        </div>
      ),
    },
    {
      title: 'Master Search',
      value: 'Master Search',
      content: (
        <div className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-br  bg-white ">
          <MasterTable
            ownedGyms={ownedGyms}
            membersData={masterTableData}
          ></MasterTable>
        </div>
      ),
    },
  ];

  return (
    <div className="h-[20rem] md:h-[40rem] [perspective:1000px]  relative b flex flex-col  mx-auto w-full  items-start justify-start ">
      <Tabs tabs={tabs} />
    </div>
  );
}

const DummyContent = () => {
  return (
    <Image
      src="/linear.webp"
      alt="dummy image"
      width="1000"
      height="1000"
      className="object-cover object-left-top h-[60%]  md:h-[90%] absolute -bottom-10 inset-x-0 w-[90%] rounded-xl mx-auto"
    />
  );
};
