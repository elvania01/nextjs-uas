export default function CustomerSkeleton() {
  return (
    <>
      {Array.from({ length: 5 }).map((_, idx) => (
        <tr key={idx} className="animate-pulse">
          <td className="px-4 py-2">
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          </td>
          <td className="px-4 py-2">
            <div className="h-4 bg-gray-200 rounded w-5/6"></div>
          </td>
          <td className="px-4 py-2">
            <div className="h-4 bg-gray-200 rounded w-2/3"></div>
          </td>
          <td className="px-4 py-2">
            <div className="h-4 bg-gray-200 rounded w-full"></div>
          </td>
          <td className="px-4 py-2">
            <div className="h-4 bg-gray-200 rounded w-12"></div>
          </td>
        </tr>
      ))}
    </>
  );
}
