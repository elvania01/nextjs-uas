const shimmer =
  'before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent';

export function AnalyticsSkeleton() {
  return (
    <div className="mt-6 space-y-6">
      {/* Header */}
      <div className={`${shimmer} relative h-8 w-40 overflow-hidden rounded-md bg-gray-100`} />

      {/* Metrics cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className={`${shimmer} relative flex flex-col gap-3 overflow-hidden rounded-xl bg-gray-100 p-4 shadow-sm`}
          >
            <div className="h-4 w-24 rounded bg-gray-200" />
            <div className="h-7 w-28 rounded bg-gray-300" />
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Left chart */}
        <div className={`${shimmer} relative h-[350px] overflow-hidden rounded-xl bg-gray-100 p-4`}>
          <div className="mb-4 h-6 w-28 rounded bg-gray-200" />
          <div className="h-full rounded bg-white" />
        </div>
        {/* Right chart */}
        <div className={`${shimmer} relative h-[350px] overflow-hidden rounded-xl bg-gray-100 p-4`}>
          <div className="mb-4 h-6 w-28 rounded bg-gray-200" />
          <div className="h-full rounded bg-white" />
        </div>
      </div>
    </div>
  );
}

export default AnalyticsSkeleton;
