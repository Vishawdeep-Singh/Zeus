"use client";
import useSWR from "swr";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, XCircle, Loader } from "lucide-react";
import { toast } from "sonner";
import { markAttendance } from "@/actions/markAttendance";
import { useWebSocket } from "@/context/socketContext";
import { useWebSockets } from "@/hooks/useWebSocket";
import { getOwnerId } from "@/actions/getOwner_Given_gymId";
import { addNotifications } from "@/actions/addNotifications";

const fetcher = async (url: string | URL | Request) => {
  const response = await fetch(url);
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error || "An error occurred while fetching attendance.");
  }
  return data;
};

export default function StylishAttendanceMarker({
  name,
  address,
  gymId,
}: {
  name: string;
  address: string;
  gymId: string;
}) {
  const {user,sendMessage}=useWebSocket()
  const { data, error, mutate, isValidating } = useSWR(
    `/api/attendanceDate?gymId=${gymId}`,
    fetcher,
    {
      errorRetryCount: 3,
      revalidateOnFocus: false,
    }
  );

  // Check if attendance is marked
  const isMarked = data && data.length > 0;

  // Display any errors as a toast notification
  if (error) {
    toast.error(error.message);
  }

  const markAttendances = async () => {
    mutate(
      async () => {
        // Show optimistic update by setting `isMarked` to `true`
        toast.success("Your attendance has been successfully marked", {
          closeButton: true,
          position: "top-center",
        });

        // Call the attendance marking function
        const response = await markAttendance(gymId);
        const response1= await getOwnerId(gymId)
        if(response1.data && response.data){
           let message = `${user?.name} with Id ${user?.id} checked in at ${name}`
          const {data}= await addNotifications(message,new Date(),response1.data.ownerId)
          sendMessage("mark-attendance",{
            userId:user?.id,
            userName:user?.name,
            gymId:gymId,
            gymName:name,
            notificationMetaData:data

          })
         
        }
  

        if (response.error || response1.error) {
          // Revert state if the request fails
          toast.error(`Error: ${response.error}`||`Error: ${response1.error}`, {
            closeButton: true,
            position: "top-center",
          });
          throw new Error(response.error);
        }

        // Return the new data to be revalidated with SWR’s internal cache
        return [{ marked: true }];
      },
      {
        optimisticData: [{ marked: true }],
        rollbackOnError: true,
        revalidate: true,
      }
    );
  };

  return (
    <Card className="w-full max-w-md overflow-hidden">
      <CardHeader className="relative z-10">
        <CardTitle className="text-2xl font-bold text-center">
          {name} Daily Attendance
        </CardTitle>
        <CardTitle className="text-md text-center">{address}</CardTitle>
      </CardHeader>
      <CardContent className="relative z-10 flex flex-col items-center space-y-6">
        <div className="text-center">
          <p className="text-xl mb-2">
            {isValidating ? (
              <span className="flex items-center justify-center text-gray-500">
                <Loader className="mr-2 animate-spin" /> Checking Status...
              </span>
            ) : isMarked ? (
              <span className="flex items-center justify-center text-green-500">
                <CheckCircle className="mr-2" /> Attendance Marked
              </span>
            ) : (
              <span className="flex items-center justify-center text-yellow-500">
                <XCircle className="mr-2" /> Not Marked Yet
              </span>
            )}
          </p>
          <Button
            onClick={markAttendances}
            disabled={isMarked || isValidating}
            className={`px-6 py-2 rounded-full transition-all duration-300 ${
              isMarked
                ? "bg-green-500 hover:bg-green-600"
                : "bg-primary hover:bg-primary/90"
            }`}
          >
            {isValidating
              ? "Loading..."
              : isMarked
              ? "Marked for Today"
              : "Mark Attendance"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
