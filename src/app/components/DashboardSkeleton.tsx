export default function DashboardSkeleton() {
  return (
    <div className="animate-pulse">
      {/* Header skeleton: simulating the page title which is overview and user icon */}
      <div className="row-between mb-8">
        <div className="h-8 w-32 skeleton-block" />
        <div className="h-10 w-36 skeleton-block" />
      </div>
      {/* Skeleton for features in benzo card grid */}
      <div className="panel">
        {/* Header row skeleton */}
        <div className="grid grid-cols-4 gap-6 px-8 py-6 bg-gray-50 dark:bg-[#1a1a1a] border-b border-gray-200 dark:border-white/10">
          {/* Row 1 */}
          <div className="h-32 skeleton-block" />
          <div className="h-32 skeleton-block" />
          <div className="h-32 skeleton-block" />

          {/* Column 4 - spans 2 rows */}
          <div className="row-span-2 h-72 skeleton-block" />

          {/* Row 2 */}
          <div className="col-span-3 h-32 skeleton-block" />
        </div>
        {/* additional col  */}
        <div className="grid grid-cols-2 gap-4 px-8 py-6">
          <div className="h-32 skeleton-block" />
          <div className="h-32 skeleton-block" />
        </div>
      </div>
    </div>
  );
}
