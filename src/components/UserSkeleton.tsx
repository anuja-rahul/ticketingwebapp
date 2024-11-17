import { Skeleton } from "@/components/ui/skeleton";

export function SkeletonCard() {
  return (
    <div className="flex flex-col space-y-3">
      <Skeleton className="h-[270px] w-[390px] rounded-3xl mb-4" />
    </div>
  );
}

interface FilledProps {
  Filler: React.ReactNode;
}

export function FilledSkeleton({Filler }: FilledProps) {
  return <Skeleton>{Filler}</Skeleton>;
}

export function SkeletonCardTable() {
  return (
    <div className="flex flex-col space-y-3 border-4 rounded-3xl p-2 border-secondary">
      <Skeleton className="w-96 h-20 rounded-xl mb-0" />
      <div className="flex flex-row items-center justify-center gap-5">
        <div className="flex flex-col items-center justify-center">
          <Skeleton className="w-28 h-10 rounded-xl mb-4" />
          <Skeleton className="w-28 h-10 rounded-xl mb-4" />
          <Skeleton className="w-28 h-10 rounded-xl mb-4" />
          <Skeleton className="w-28 h-10 rounded-xl mb-4" />
          <Skeleton className="w-28 h-10 rounded-xl mb-4" />
        </div>
        <div className="flex flex-col items-center justify-center">
          <Skeleton className="w-28 h-10 rounded-xl mb-4" />
          <Skeleton className="w-28 h-10 rounded-xl mb-4" />
          <Skeleton className="w-28 h-10 rounded-xl mb-4" />
          <Skeleton className="w-28 h-10 rounded-xl mb-4" />
          <Skeleton className="w-28 h-10 rounded-xl mb-4" />
        </div>
        <div className="flex flex-col items-center justify-center">
          <Skeleton className="w-28 h-10 rounded-xl mb-4" />
          <Skeleton className="w-28 h-10 rounded-xl mb-4" />
          <Skeleton className="w-28 h-10 rounded-xl mb-4" />
          <Skeleton className="w-28 h-10 rounded-xl mb-4" />
          <Skeleton className="w-28 h-10 rounded-xl mb-4" />
        </div>
      </div>
    </div>
  );
}
