// Streamed placeholder while `getDashboardData()` runs. Mirrors the real
// layout so nothing jumps when the data lands.
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function DashboardLoading() {
  return (
    <>
      <div className="flex flex-col gap-2">
        <Skeleton className="h-8 w-44" />
        <Skeleton className="h-4 w-56" />
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
        {Array.from({ length: 5 }).map((_, index) => (
          <Card key={index} className="gap-0 py-4 shadow-none">
            <CardHeader className="px-4">
              <Skeleton className="h-3 w-16" />
            </CardHeader>
            <CardContent className="px-4 pt-2">
              <Skeleton className="h-8 w-10" />
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        {Array.from({ length: 2 }).map((_, index) => (
          <Card key={index} className="shadow-none">
            <CardHeader>
              <Skeleton className="h-5 w-48" />
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              {Array.from({ length: 4 }).map((__, row) => (
                <div key={row} className="flex items-center justify-between gap-3">
                  <Skeleton className="h-4 w-40" />
                  <Skeleton className="h-4 w-20" />
                </div>
              ))}
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  );
}
