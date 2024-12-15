import { Skeleton } from "@/components/ui/skeleton";

const MembershipCardSkeleton = () => {
    return (<div className="grid grid-cols-3 items-center gap-8">
      <div className="rounded-2xl  ml-10 shadow-xl border border-gray-200 p-4 max-w-sm">
        {/* Image Skeleton */}
        <Skeleton className="w-full h-48 rounded-t-lg" />
  
        {/* Text Skeletons */}
        <div className="mt-3 space-y-2">
          <Skeleton className="h-6 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
          <Skeleton className="h-4 w-1/3" />
        </div>
  
        {/* Membership Details Skeletons */}
        <div className="mt-4 space-y-2">
          <Skeleton className="h-4 w-1/4" />
          <Skeleton className="h-4 w-2/3" />
          <Skeleton className="h-4 w-4/5" />
        </div>
  
        {/* Button Skeleton */}
        <Skeleton className="mt-4 h-10 w-full rounded-md" />
      </div>
      <div className="rounded-2xl shadow-xl border border-gray-200 p-4 max-w-sm">
        {/* Image Skeleton */}
        <Skeleton className="w-full h-48 rounded-t-lg" />
  
        {/* Text Skeletons */}
        <div className="mt-3 space-y-2">
          <Skeleton className="h-6 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
          <Skeleton className="h-4 w-1/3" />
        </div>
  
        {/* Membership Details Skeletons */}
        <div className="mt-4 space-y-2">
          <Skeleton className="h-4 w-1/4" />
          <Skeleton className="h-4 w-2/3" />
          <Skeleton className="h-4 w-4/5" />
        </div>
  
        {/* Button Skeleton */}
        <Skeleton className="mt-4 h-10 w-full rounded-md" />
      </div>
      <div className="rounded-2xl shadow-xl border border-gray-200 p-4 max-w-sm">
        {/* Image Skeleton */}
        <Skeleton className="w-full h-48 rounded-t-lg" />
  
        {/* Text Skeletons */}
        <div className="mt-3 space-y-2">
          <Skeleton className="h-6 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
          <Skeleton className="h-4 w-1/3" />
        </div>
  
        {/* Membership Details Skeletons */}
        <div className="mt-4 space-y-2">
          <Skeleton className="h-4 w-1/4" />
          <Skeleton className="h-4 w-2/3" />
          <Skeleton className="h-4 w-4/5" />
        </div>
  
        {/* Button Skeleton */}
        <Skeleton className="mt-4 h-10 w-full rounded-md" />
      </div>
     
     
     
      </div>
    );
  };
  
  export default MembershipCardSkeleton;