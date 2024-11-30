'use client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Search, CalendarCheck } from 'lucide-react';
import { DatePicker } from './datePicker';
import { SelectGyms } from './gymSelector';
import { useEffect, useState } from 'react';
import { dateRange, GymFilterState } from '@/states/filters';
import { useRecoilState, useRecoilValue } from 'recoil';
import { GymsData, MasterTableMember } from '@/types/types';
import BeatLoader from 'react-spinners/BeatLoader';
import { checkIfItLiesInRange } from '@/lib/helper';
import { AttendanceDropDown } from './AttendaceDropDown';
import { useRouter } from 'next/navigation';

// const membersData = [
//   {
//     id: 1,
//     name: "John Doe",
//     email: "john.doe@example.com",
//     phone: "123-456-7890",
//     gymName: "Fitness Hub",
//     membershipDuration: "12 months",
//     daysLeft: 90,
//   },
//   {
//     id: 2,
//     name: "Jane Smith",
//     email: "jane.smith@example.com",
//     phone: "234-567-8901",
//     gymName: "Powerhouse Gym",
//     membershipDuration: "6 months",
//     daysLeft: 45,
//   },
//   {
//     id: 3,
//     name: "Michael Brown",
//     email: "michael.brown@example.com",
//     phone: "345-678-9012",
//     gymName: "Body Builders",
//     membershipDuration: "3 months",
//     daysLeft: 10,
//   },
//   {
//     id: 4,
//     name: "Emily Johnson",
//     email: "emily.johnson@example.com",
//     phone: "456-789-0123",
//     gymName: "Fitness Hub",
//     membershipDuration: "1 month",
//     daysLeft: 5,
//   },
//   {
//     id: 5,
//     name: "Chris Lee",
//     email: "chris.lee@example.com",
//     phone: "567-890-1234",
//     gymName: "Gym Central",
//     membershipDuration: "6 months",
//     daysLeft: 30,
//   },
//   {
//     id: 6,
//     name: "Sarah Wilson",
//     email: "sarah.wilson@example.com",
//     phone: "678-901-2345",
//     gymName: "Powerhouse Gym",
//     membershipDuration: "12 months",
//     daysLeft: 180,
//   },
//   {
//     id: 7,
//     name: "David White",
//     email: "david.white@example.com",
//     phone: "789-012-3456",
//     gymName: "Elite Fitness",
//     membershipDuration: "3 months",
//     daysLeft: 15,
//   },
//   {
//     id: 8,
//     name: "Olivia Harris",
//     email: "olivia.harris@example.com",
//     phone: "890-123-4567",
//     gymName: "Body Builders",
//     membershipDuration: "1 month",
//     daysLeft: 10,
//   },
//   {
//     id: 9,
//     name: "James Clark",
//     email: "james.clark@example.com",
//     phone: "901-234-5678",
//     gymName: "Powerhouse Gym",
//     membershipDuration: "12 months",
//     daysLeft: 300,
//   },
//   {
//     id: 10,
//     name: "Sophia Lewis",
//     email: "sophia.lewis@example.com",
//     phone: "012-345-6789",
//     gymName: "Gym Central",
//     membershipDuration: "6 months",
//     daysLeft: 120,
//   },
//   {
//     id: 11,
//     name: "Liam Martinez",
//     email: "liam.martinez@example.com",
//     phone: "213-546-8790",
//     gymName: "Elite Fitness",
//     membershipDuration: "12 months",
//     daysLeft: 270,
//   },
//   {
//     id: 12,
//     name: "Mia Thompson",
//     email: "mia.thompson@example.com",
//     phone: "321-654-0987",
//     gymName: "Fitness Hub",
//     membershipDuration: "3 months",
//     daysLeft: 40,
//   },
//   {
//     id: 13,
//     name: "Lucas Robinson",
//     email: "lucas.robinson@example.com",
//     phone: "432-765-1098",
//     gymName: "Powerhouse Gym",
//     membershipDuration: "1 month",
//     daysLeft: 20,
//   },
//   {
//     id: 14,
//     name: "Amelia Walker",
//     email: "amelia.walker@example.com",
//     phone: "543-876-2109",
//     gymName: "Gym Central",
//     membershipDuration: "6 months",
//     daysLeft: 85,
//   },
//   {
//     id: 15,
//     name: "Ethan Hall",
//     email: "ethan.hall@example.com",
//     phone: "654-987-3210",
//     gymName: "Body Builders",
//     membershipDuration: "12 months",
//     daysLeft: 150,
//   },
//   {
//     id: 16,
//     name: "Ava Scott",
//     email: "ava.scott@example.com",
//     phone: "765-098-4321",
//     gymName: "Elite Fitness",
//     membershipDuration: "3 months",
//     daysLeft: 25,
//   },
//   {
//     id: 17,
//     name: "Mason Green",
//     email: "mason.green@example.com",
//     phone: "876-109-5432",
//     gymName: "Fitness Hub",
//     membershipDuration: "1 month",
//     daysLeft: 5,
//   },
//   {
//     id: 18,
//     name: "Isabella Perez",
//     email: "isabella.perez@example.com",
//     phone: "987-210-6543",
//     gymName: "Powerhouse Gym",
//     membershipDuration: "6 months",
//     daysLeft: 95,
//   },
//   {
//     id: 19,
//     name: "Logan Adams",
//     email: "logan.adams@example.com",
//     phone: "098-321-7654",
//     gymName: "Gym Central",
//     membershipDuration: "12 months",
//     daysLeft: 310,
//   },
//   {
//     id: 20,
//     name: "Charlotte Baker",
//     email: "charlotte.baker@example.com",
//     phone: "109-432-8765",
//     gymName: "Body Builders",
//     membershipDuration: "3 months",
//     daysLeft: 60,
//   },
// ];

export function MasterTable({
  membersData,
  ownedGyms,
}: {
  membersData: MasterTableMember[];
  ownedGyms: { gymId: string; gymName: string }[];
}) {
  const router = useRouter();
  console.log('Master table member data', membersData);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setGymFilter] = useRecoilState(GymFilterState);
  const dateFilter = useRecoilValue(dateRange);
  const [dateFilteredData, setDateFilteredData] = useState<
    MasterTableMember[] | null
  >(null);
  const [nameFilteredMembers, setnameFilteredMembers] = useState<
    MasterTableMember[] | null
  >(null);

  useEffect(() => {
    if (dateFilter?.from || dateFilter?.to) {
      const filteredDateData = checkIfItLiesInRange(membersData, dateFilter);
      setDateFilteredData(filteredDateData);
    } else {
      setDateFilteredData(null);
    }
  }, [dateFilter, membersData]);

  useEffect(() => {
    const dateToFilter = dateFilteredData || membersData;
    const filteredMembers = dateToFilter.filter((member) => {
      // Optimised (ChatGPT version)
      const isGymMatch =
        filter && filter !== 'null'
          ? member.gymName.toLowerCase().includes(filter.toLowerCase())
          : true;
      const isNameMatch = member.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

      return isGymMatch && isNameMatch;
    });
    setnameFilteredMembers(filteredMembers);
  }, [searchTerm, filter, dateFilteredData, membersData]);

  //   let nameFilteredMembers:any=[] // My version

  //   if(filter && filter!=="null"){
  //     nameFilteredMembers = membersData.filter((member) =>
  //         member.gymName.toLowerCase().includes(filter.toLowerCase())
  //       );
  //       nameFilteredMembers=nameFilteredMembers.filter((member:any)=>{
  //         return member.name.toLowerCase().includes(searchTerm.toLowerCase())
  //       })
  //   }
  //   else{
  //     nameFilteredMembers = membersData.filter((member) =>
  //         member.name.toLowerCase().includes(searchTerm.toLowerCase())
  //       );
  //   }

  if (!membersData && !ownedGyms) {
    return (
      <div className="flex items-center justify-center h-screen w-full">
        <BeatLoader loading={true} color="black"></BeatLoader>
      </div>
    );
  }

  return (
    <div>
      <Card className="w-full max-w-7xl bg-[#f7f7f7] pt-4 mx-auto hover:shadow-lg  hover:shadow-primary/40 transition-shadow duration-200 shadow-sm">
        <CardContent>
          <div className="flex items-center space-x-2 mb-4">
            {membersData && <DatePicker membersData={membersData}></DatePicker>}
            <SelectGyms ownedGyms={ownedGyms}></SelectGyms>
            <Input
              className="w-52"
              type="email"
              onChange={(e) => {
                setSearchTerm(e.target.value);
              }}
              placeholder=" Name"
            />
          </div>
          <div
            className="max-h-96 overflow-y-auto [&::-webkit-scrollbar]:w-2
  [&::-webkit-scrollbar-track]:bg-transparent
  [&::-webkit-scrollbar-thumb]:bg-gray-300
  [&::-webkit-scrollbar-thumb]:rounded-full
  dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500"
          >
            <Table className="">
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead>Gym Name</TableHead>
                  <TableHead>Memberhsip Duration</TableHead>
                  <TableHead>Days Left</TableHead>
                  {dateFilter && <TableHead>Attendance Dates</TableHead>}
                </TableRow>
              </TableHeader>
              <TableBody className="font-medium">
                {nameFilteredMembers &&
                  nameFilteredMembers.map((member, i) => (
                    <TableRow
                      onClick={() => {
                        router.push(`/profile?userId=${member.id}`);
                      }}
                      className="hover:bg-gray-200 cursor-pointer"
                      key={i}
                    >
                      <TableCell>{member.id}</TableCell>
                      <TableCell>{member.name}</TableCell>
                      <TableCell>{member.email}</TableCell>
                      <TableCell>{member.phone}</TableCell>
                      <TableCell>{member.gymName}</TableCell>
                      <TableCell>{member.membershipDuration}</TableCell>
                      <TableCell>{member.daysLeft}</TableCell>
                      {dateFilter && (
                        <TableCell className="z-50">
                          <AttendanceDropDown attendances={member.attendance} />
                        </TableCell>
                      )}
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
