// Streamed placeholder for the clients list.
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function ClientsLoading() {
  return (
    <>
      <div className="flex flex-wrap items-start justify-between gap-3">
        <Skeleton className="h-8 w-36" />
        <Skeleton className="h-10 w-36" />
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2 sm:flex-row">
          <Skeleton className="h-9 w-full sm:max-w-xs" />
          <Skeleton className="h-9 w-full sm:w-48" />
        </div>

        <Card className="overflow-hidden py-0 shadow-none">
          <div className="flex flex-col divide-y divide-border">
            {Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="flex items-center gap-4 px-4 py-3.5">
                <Skeleton className="h-4 w-40" />
                <Skeleton className="hidden h-4 w-32 sm:block" />
                <Skeleton className="ml-auto h-5 w-20" />
              </div>
            ))}
          </div>
        </Card>
      </div>
    </>
  );
}
