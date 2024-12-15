import React from "react";
import { Skeleton } from "@/components/ui/skeleton"; // Adjust import based on your setup

const AnalyticsSkeleton = () => {
  return (
    <div className="p-6  space-y-6">

        <div className="flex space-x-8 w-full items-center">
        <Skeleton className="h-10 w-36 rounded-3xl" /> {/* Title Placeholder */}
        <Skeleton className="h-10 w-36 rounded-3xl" /> {/* Dropdown Placeholder */}
        <Skeleton className="h-10 w-36 rounded-3xl" /> {/* Title Placeholder */}
        <Skeleton className="h-10 w-36 rounded-3xl" /> {/* Dropdown Placeholder */}
      </div>
      {/* Header */}
      <div className="flex mt-5 space-x-8 items-center">
        <Skeleton className="h-10 w-36" /> {/* Title Placeholder */}
        <Skeleton className="h-10 w-36" /> {/* Dropdown Placeholder */}
      </div>

      {/* Analytics Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 ">
        {/* Attendance Chart Placeholder */}
        <div className="p-6 border rounded-lg space-y-4 bg-[#f7f7f7]">
          <Skeleton className="h-8 w-3/4" /> {/* Chart Title */}
          <Skeleton className="h-40 w-full" /> {/* Bar Chart */}
          <Skeleton className="h-6 w-1/2" /> {/* Footer Text */}
        </div>

        {/* Revenue Chart Placeholder */}
        <div className="p-6 border rounded-lg space-y-4 bg-[#f7f7f7]">
          <Skeleton className="h-8 w-3/4" /> {/* Chart Title */}
          <Skeleton className="h-40 w-full" /> {/* Line/Area Chart */}
          <Skeleton className="h-6 w-1/2" /> {/* Footer Text */}
        </div>
      </div>
    </div>
  );
};

export default AnalyticsSkeleton;
