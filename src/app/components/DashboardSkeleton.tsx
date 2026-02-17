export default function DashboardSkeleton() {
  return (
    <div className="animate-pulse">
      {/* Header skeleton: simulating the page title which is overview and user icon */}
      <div className="flex items-center justify-between mb-8">
        <div className="h-8 w-32 bg-gray-300 dark:bg-gray-600 rounded" />
        <div className="h-10 w-36 bg-gray-300 dark:bg-gray-600 rounded" />
      </div>
      {/* Skeleton for features in benzo card grid */}
      <div className="overflow-hidden rounded-lg border border-gray-200 dark:border-dark-border-subtle bg-white dark:bg-[#121212] shadow-sm">
        {/* Header row skeleton */}
        <div className="grid grid-cols-4 gap-6 px-8 py-6 bg-gray-50 dark:bg-[#1a1a1a] border-b border-gray-200 dark:border-dark-border-subtle">
          {/* Row 1 */}
          <div className="h-32 bg-gray-300 dark:bg-gray-600 rounded" />
          <div className="h-32 bg-gray-300 dark:bg-gray-600 rounded" />
          <div className="h-32 bg-gray-300 dark:bg-gray-600 rounded" />

          {/* Column 4 - spans 2 rows */}
          <div className="row-span-2 h-72 bg-gray-300 dark:bg-gray-600 rounded" />

          {/* Row 2 */}
          <div className="col-span-3 h-32 bg-gray-300 dark:bg-gray-600 rounded" />
        </div>
        {/* additional col  */}
        <div className="grid grid-cols-2 gap-4 px-8 py-6">
          <div className="h-32 bg-gray-300 dark:bg-gray-600 rounded" />
          <div className="h-32 bg-gray-300 dark:bg-gray-600 rounded" />

        </div>
      </div>
    </div>
  );
}
