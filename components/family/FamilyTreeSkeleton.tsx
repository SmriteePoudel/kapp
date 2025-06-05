
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardHeader, CardContent } from "@/components/ui/card";

export function FamilyTreeSkeleton() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 to-amber-50 dark:from-slate-900 dark:to-slate-800">
      <div className="bg-white dark:bg-slate-900 shadow-sm">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center mb-8">
            <Skeleton className="h-12 w-64 mx-auto mb-4 bg-gray-200 dark:bg-slate-700" />
            <Skeleton className="h-6 w-96 mx-auto bg-gray-200 dark:bg-slate-700" />
          </div>
          <div className="flex flex-col sm:flex-row gap-4 max-w-4xl mx-auto">
            <Skeleton className="h-10 flex-1 bg-gray-200 dark:bg-slate-700" />
            <div className="flex gap-2">
              {[1, 2, 3, 4].map((i) => (
                <Skeleton
                  key={i}
                  className="h-10 w-16 bg-gray-200 dark:bg-slate-700"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="container mx-auto px-4 py-12">
        {[1, 2, 3].map((gen) => (
          <div key={gen} className="mb-12">
            <div className="text-center mb-8">
              <Skeleton className="h-8 w-32 mx-auto bg-gray-200 dark:bg-slate-700" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: gen === 1 ? 2 : gen === 2 ? 4 : 4 }).map(
                (_, i) => (
                  <Card key={i} className="bg-white dark:bg-slate-800">
                    <CardHeader className="text-center p-4">
                      <Skeleton className="w-24 h-24 md:w-32 md:h-32 rounded-full mx-auto mb-4 bg-gray-200 dark:bg-slate-700" />
                      <Skeleton className="h-6 w-32 mx-auto mb-2 bg-gray-200 dark:bg-slate-700" />
                      <Skeleton className="h-4 w-24 mx-auto bg-gray-200 dark:bg-slate-700" />
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                      <Skeleton className="h-16 w-full mb-4 bg-gray-200 dark:bg-slate-700" />
                      <Skeleton className="h-8 w-full bg-gray-200 dark:bg-slate-700" />
                    </CardContent>
                  </Card>
                )
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
