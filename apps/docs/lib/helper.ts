
import {
  ExpiredMembers,
  Gym1,
  GymsData,
  MasterTableMember,
} from "@/types/types";
import prisma from "@repo/db/client";
import moment from "moment";
import { DateRange } from "react-day-picker";
import { current } from "tailwindcss/colors";

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

export const membershipExpiryConversion = (data: Gym1) => {
  let gymId = data.id;
  const expiredMembers = data.members
    .filter((obj) => {
      const currentGymMembership = obj.memberships.filter((obj1) => {
        return obj1.gymId === gymId;
      });
      if (currentGymMembership.length === 0) return false;
      const dateJoined = new Date(currentGymMembership[0]!.dateJoined); //
      const membershipDuration = currentGymMembership[0]!.membership.duration;

      const expirationDate = new Date(dateJoined);
      expirationDate.setMonth(expirationDate.getMonth() + membershipDuration);

      const isExpired = new Date() < expirationDate;
      return isExpired;
    })
    .map((obj3) => {
      let currentGymMembership = obj3.memberships.filter((obj4) => {
        return obj4.gymId === gymId;
      });
      if (currentGymMembership.length === 0) return null;
      const dateJoined = new Date(currentGymMembership[0]!.dateJoined);
      const membershipDuration = currentGymMembership[0]!.membership.duration;

      const expirationDate = new Date(dateJoined);
      expirationDate.setMonth(expirationDate.getMonth() + membershipDuration);

      return {
        id: obj3.id,
        name: obj3.name,
        email: obj3.email,
        phoneNumber: obj3.cellPh,
        membershipDuration: currentGymMembership[0]!.membership.duration,
        expiredOn: expirationDate.toDateString(),
      };
    });

  console.log(expiredMembers);
  return expiredMembers as ExpiredMembers[];
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

export const checkIfItLiesInRange = (
  membersData: MasterTableMember[],
  dateRange: DateRange
) => {
  const membersExistBetweenDate = membersData.filter((member) =>
    member.attendance.some((date) => {
      const attendDate = new Date(date);
      if (dateRange.from && !dateRange.to) {
        return attendDate.toDateString() === dateRange.from.toDateString();
      } else if (dateRange.from && dateRange.to) {
        return dateRange.from! <= attendDate && attendDate <= dateRange.to!;
      }
      return false;
    })
  );

  return membersExistBetweenDate;
};



