// components/TransactionTableSkeleton.tsx
export default function TransactionTableSkeleton() {
  const skeletonRows = Array(6).fill(null);

  return (
    <div className="max-w-6xl mx-auto mt-10 p-4">
      {/* Skeleton Judul */}
      <div className="h-8 w-48 bg-gray-300 rounded animate-pulse mb-6" />

      <section>
        <div className="overflow-x-auto rounded-lg border border-gray-300 shadow-md">
          <table className="w-full border-collapse border border-gray-300">
            <thead className="bg-pink-200 text-pink-800">
              <tr>
                {Array(5).fill(null).map((_, i) => (
                  <th key={i} className="px-4 py-2">
                    <div className="h-4 w-24 bg-gray-300 rounded animate-pulse" />
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {skeletonRows.map((_, idx) => (
                <tr key={idx} className="odd:bg-white even:bg-pink-50">
                  {Array(5).fill(null).map((__, i) => (
                    <td key={i} className="border border-gray-300 px-4 py-2">
                      <div className="h-4 bg-gray-300 rounded animate-pulse w-full max-w-[80px]" />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
