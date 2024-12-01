import { Avatar } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  CalendarDays,
  Trophy,
  Dumbbell,
  MapPin,
  Clock,
  Mail,
  Phone,
  Flame,
  Calendar,
} from 'lucide-react';
import moment from 'moment';
import MultiAvatar from './Multiavatar';
import Image from 'next/image';

// const generateAttendanceData = () => {
//   const today = new Date()
//   const data = {}
//   for (let i = 0; i < 365; i++) {
//     const date = new Date(today.getFullYear(), today.getMonth(), today.getDate() - i)
//     data[date.toISOString().split('T')[0]] = Math.floor(Math.random() * 4)
//   }
//   return data
// }
const transformAttendanceData = (attendance: any[]) => {
  const data: any = {};

  attendance.forEach((record: { date: string }) => {
    const dateParts = record.date.split('/');
    const dateString = `${dateParts[2]}-${dateParts[0]?.padStart(2, '0')}-${dateParts[1]?.padStart(2, '0')}`; // Convert to 'YYYY-MM-DD'

    if (data[dateString]) {
      data[dateString] += 1; // Increment count if date already exists
    } else {
      data[dateString] = 1; // Initialize count if it's the first entry for this date
    }
  });

  return data;
};

const MONTHS = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

export default function ProfilePage({ userProfileInfo }: any) {
  const attendanceDataTransformed = transformAttendanceData(
    userProfileInfo.attendance
  );

  const joinedDate = new Date(userProfileInfo.memberships?.[0].dateJoined);
  const expirationDate = new Date(joinedDate);
  expirationDate.setMonth(
    userProfileInfo.memberships?.[0].membership.duration + joinedDate.getMonth()
  );
  const currentDate = new Date();
  const isActive = expirationDate > currentDate;

  const originalDate = moment(userProfileInfo.memberships?.[0].dateJoined);

  const monthsToSubtract = userProfileInfo.memberships?.[0].membership.duration;
  const addMonths = originalDate.clone().add(monthsToSubtract, 'months');

  // Calculate the difference in days
  const differenceInDays = addMonths.diff(moment(), 'days');

  const getColor = (count: number) => {
    if (count === 0) return 'bg-gray-200 dark:bg-gray-700';
    if (count === 1) return 'bg-gray-800 dark:bg-gray-200';
    if (count === 2) return 'bg-gray-600 dark:bg-gray-400';
    return 'bg-gray-800 dark:bg-gray-200';
  };

  const renderAttendanceBoard = () => {
    const weeks = [];
    const today = new Date();
    const monthLabels = [];

    for (let i = 0; i < 52; i++) {
      const week = [];
      for (let j = 0; j < 7; j++) {
        const date = new Date(
          today.getFullYear(),
          today.getMonth(),
          today.getDate() - (i * 7 + j)
        );
        const dateString = date.toISOString().split('T')[0];
        const count = attendanceDataTransformed[dateString!] || 0;
        week.push(
          <div
            key={dateString}
            className={`w-3 h-3 ${getColor(count)} rounded-sm transition-all duration-300 ease-in-out hover:transform hover:scale-150 hover:z-10`}
            title={`${date.toDateString()}: ${count} workouts`}
          />
        );

        if (date.getDate() === 1 || (i === 0 && j === 0)) {
          monthLabels.push(
            <div
              key={`month-${date.getMonth()}-${date.getFullYear()}`}
              className="absolute text-xs text-gray-500 dark:text-gray-400"
              style={{
                left: `${(51 - i) * 16}px`,
                top: '-20px',
              }}
            >
              {MONTHS[date.getMonth()]}
            </div>
          );
        }
      }
      weeks.push(
        <div key={i} className="flex flex-col gap-1">
          {week}
        </div>
      );
    }

    return (
      <div className="relative">
        <div className="flex gap-1 mt-6">{weeks.reverse()}</div>
        {monthLabels}
      </div>
    );
  };

  return (
    <div className="container mx-auto p-6 bg-white dark:bg-black min-h-screen">
      <Card className="w-full max-w-4xl mx-auto overflow-hidden shadow-lg bg-gray-100 dark:bg-gray-900">
        <CardHeader className="relative p-6 bg-gray-200 dark:bg-gray-800">
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <Avatar className="w-24 h-24 border-4 border-white dark:border-gray-900 shadow-md">
              {userProfileInfo?.provider === 'google' ? (
                <Image
                  src={userProfileInfo.image as string}
                  className="rounded-full  object-cover"
                  width={1000}
                  height={1000}
                  alt="Avatar"
                />
              ) : (
                <MultiAvatar name={userProfileInfo.name as string} />
              )}

              {/* <AvatarFallback>{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback> */}
            </Avatar>
            <div className="flex-grow text-center sm:text-left">
              <CardTitle className="text-3xl font-bold mb-1 text-black dark:text-white">
                {userProfileInfo.name}
              </CardTitle>
              <p className="text-gray-600 dark:text-gray-400">
                Fitness Enthusiast
              </p>
              <div className="flex flex-wrap justify-center sm:justify-start gap-2 mt-3">
                <Badge
                  variant="secondary"
                  className="bg-gray-300 text-gray-800 dark:bg-gray-700 dark:text-gray-200"
                >
                  <Trophy className="w-3 h-3 mr-1" />
                  Pro Member
                </Badge>
                <Badge
                  variant="secondary"
                  className="bg-gray-300 text-gray-800 dark:bg-gray-700 dark:text-gray-200"
                >
                  <Dumbbell className="w-3 h-3 mr-1" />
                  Power Lifter
                </Badge>
              </div>
            </div>
            <div className="text-right mt-4 sm:mt-0">
              <p className="text-sm font-medium flex items-center justify-end text-gray-600 dark:text-gray-400">
                <MapPin className="w-4 h-4 mr-1 text-gray-500 dark:text-gray-400" />
                {userProfileInfo.member?.[0].name}
              </p>
              <Badge
                // @ts-ignore
                variant={isActive ? 'success' : 'destructive'}
                className={`${isActive ? 'mt-1 text-lg text-green-400' : 'mt-1 text-red-600'}`}
              >
                {isActive ? 'Active' : 'Expired'}
              </Badge>
              {isActive && (
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 flex items-center justify-end">
                  <Clock className="w-3 h-3 mr-1 text-gray-500 dark:text-gray-400" />
                  Membership Expires in {differenceInDays} days
                </p>
              )}
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 flex items-center justify-end">
                <Calendar className="w-3 h-3 mr-1 text-gray-500 dark:text-gray-400" />
                Membership Plan :{' '}
                {userProfileInfo.memberships?.[0].membership.duration} months
              </p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-6 space-y-8 bg-white dark:bg-gray-900">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex items-center p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
              <Mail className="w-5 h-5 mr-3 text-gray-500 dark:text-gray-400" />
              <a
                href={`mailto:${userProfileInfo.email}`}
                className="text-gray-800 dark:text-gray-200 hover:underline"
              >
                {userProfileInfo.email}
              </a>
            </div>
            <div className="flex items-center p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
              <Phone className="w-5 h-5 mr-3 text-gray-500 dark:text-gray-400" />
              <a
                href={`tel:${userProfileInfo.cellPh}`}
                className="text-gray-800 dark:text-gray-200 hover:underline"
              >
                {userProfileInfo.cellPh}
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4 text-black dark:text-white flex items-center">
              <Flame className="w-5 h-5 mr-2 text-gray-500 dark:text-gray-400" />
              Workout Attendance
            </h3>
            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg shadow-inner overflow-x-auto">
              {renderAttendanceBoard()}
            </div>
            <div className="flex items-center justify-end mt-2 text-sm text-gray-600 dark:text-gray-400">
              <CalendarDays className="w-4 h-4 mr-1 text-gray-500 dark:text-gray-400" />
              Last 52 weeks
            </div>
          </div>

          {/* <div>
            <h3 className="text-xl font-semibold mb-4 text-black dark:text-white flex items-center">
              <Trophy className="w-5 h-5 mr-2 text-gray-500 dark:text-gray-400" />
              Stats
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Card className="bg-gray-100 dark:bg-gray-800">
                <CardContent className="p-4">
                  <p className="text-3xl font-bold text-black dark:text-white">
                    157
                  </p>
                  <p className="text-gray-600 dark:text-gray-400">
                    Total Workouts
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-gray-100 dark:bg-gray-800">
                <CardContent className="p-4">
                  <p className="text-3xl font-bold text-black dark:text-white">
                    3
                  </p>
                  <p className="text-gray-600 dark:text-gray-400">
                    Current Streak
                  </p>
                </CardContent>
              </Card>
            </div>
          </div> */}
        </CardContent>
      </Card>
    </div>
  );
}
