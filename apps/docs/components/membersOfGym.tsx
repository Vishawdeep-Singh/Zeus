import { Zap } from "lucide-react";
import { Button } from "./ui/button";
import { ScrollArea } from "./ui/scroll-area";
import moment from "moment";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import MultiAvatar from "./Multiavatar";
import Image from "next/image";

export async function MembersofGym({ membersDetails }: any) {
  const session =await getServerSession(authOptions)
  console.log("Inside members of gym", membersDetails);
  return (
    <div className=" h-96 w-full mx-auto overflow-y-auto bg-muted bg-opacity-100 shadow-sm  hover:shadow-2xl hover:shadow-primary/30  hover:scale-105 transition-all  duration-300 hover:bg-white rounded-xl border p-4">
      <div className="grid grid-cols-3 gap-4 items-center content-center w-full ">
        {membersDetails.map((member: any, i: any) => {
          console.log(member.memberships);
          let JoinedDate = moment(member.memberships?.[0].dateJoined).format(
            "DD/MM/YYYY"
          );
          console.log("JoinedDate", member.memberships?.[0].dateJoined);
          const originalDate = moment(member.memberships?.[0].dateJoined);

          const monthsToSubtract = member.memberships?.[0].membership.duration;
          const addMonths = originalDate
            .clone()
            .add(monthsToSubtract, "months");
          console.log(moment(addMonths).format("DD/MM/YYYY")); // Number of months to subtract

          // Calculate the difference in days
          const differenceInDays = addMonths.diff(moment(), "days");
          console.log(moment().format("DD/MM/YY"));
          console.log(differenceInDays);
          return (
            <Popover key={i}>
              <PopoverTrigger>
                <div className=" p-5 flex rounded-lg text-lg hover:bg-slate-50 space-x-5 items-center">
                {session?.user.provider === "google" ? (
             
                    <Image
                      src={session.user.image as string}
                      className="h-7 w-7 flex-shrink-0 rounded-full"
                      width={50}
                      height={50}
                      alt="Avatar"
                    />
                 
            ) : (
             
                    <MultiAvatar
                      name={member.name as string}
                      className="h-12 w-12"
                    ></MultiAvatar>
                
             
            )}
                  <p>{member.name}</p>
                </div>
              </PopoverTrigger>

              <PopoverContent className="shadow-lg border border-gray-200 rounded-lg p-5 bg-white max-w-sm">
                <div className="flex flex-col space-y-4">
                  {/* Top section with profile and icon */}
                  <div className="flex justify-between items-center">
                    {/* Profile section */}
                    <div className="flex items-center space-x-3">
                      <div className="h-10 w-10 bg-black rounded-full flex-shrink-0"></div>
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
                      <strong>Membership:</strong>{" "}
                      {member.memberships?.[0].membership.duration} months , Rs.{" "}
                      {member.memberships?.[0].membership.price}
                    </div>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          );
        })}
      </div>
    </div>
  );
}
