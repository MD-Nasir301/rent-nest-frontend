export default function Loading() {
  return (
    <div className="max-w-7xl mx-auto p-6 text-center text-gray-500 py-20">
      <div className="animate-pulse space-y-4">
        <div className="h-8 bg-gray-200 rounded w-1/4 mx-auto"></div>
        <div className="h-64 bg-gray-200 rounded"></div>
      </div>
    </div>
  );
}
