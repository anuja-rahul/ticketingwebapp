import { Skeleton } from "@/components/ui/skeleton";

export function SkeletonCard() {
  return (
    <div className="flex flex-col space-y-3">
      <Skeleton className="h-[270px] w-[390px] rounded-3xl mb-4" />
    </div>
  );
}

export function SkeletonCardTable() {
  return (
    <div className="flex flex-col space-y-3">
      <Skeleton className="w-96 h-80 rounded-xl mb-4" />
    </div>
  );
}
