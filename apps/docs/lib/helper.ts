import { GymsData, MasterTableMember } from "@/types/types";
import moment from "moment";
import { DateRange } from "react-day-picker";

export const masterTableDataConversion = async (gymsData: GymsData) => {
  let newData;
  newData = gymsData.flatMap((gym, i) => {
    let members = gym.members.map((member, i) => {
      let attendance = member.attendance
        .filter((attend) => gym.id === attend.gymId)
        .map((attend) => attend.date);
      let duration = member.memberships.find((m) => m.gymId === gym.id)
        ?.membership.duration;

      let dateJoined = member.memberships.find(
        (m) => m.gymId === gym.id
      )?.dateJoined;

      const originalDate = moment(dateJoined);

      const monthsToSubtract = duration;
      const addMonths = originalDate.clone().add(monthsToSubtract, "months");

      const differenceInDays = addMonths.diff(moment(), "days");
      return {
        id: member.id,
        name: member.name,
        email: member.email,
        phone: member.cellPh,
        gymName: gym.name,
        membershipDuration: duration,
        daysLeft: differenceInDays,
        attendance: attendance,
      };
    });
    return members;
  });

  return newData;
};

export const onwerGymsConversion = async (gymsData: GymsData) => {
  let newData;
  newData = gymsData.map((gym, i) => {
    return {
      gymId: gym.id,
      gymName: gym.name,
    };
  });
  return newData;
};


export const checkIfItLiesInRange=(membersData: MasterTableMember[],dateRange:DateRange)=>{
  const membersExistBetweenDate = membersData.filter((member) =>
    member.attendance.some((date) => {
      const attendDate = new Date(date);
      if(dateRange.from && !dateRange.to){
        return attendDate.toDateString() === dateRange.from.toDateString();
      }
      else if(dateRange.from && dateRange.to){
        return dateRange.from! <= attendDate && attendDate <= dateRange.to!;
      }
      return false;
      
    })
  );

  return membersExistBetweenDate;
}
