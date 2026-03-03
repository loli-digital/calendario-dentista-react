function MisCitasSkeleton() {
  return (
    <div className="animate-pulse px-5 py-10 space-y-10 max-w-xl mx-auto">

      <div className="h-10 w-1/2 bg-gray-300 rounded mx-auto"></div>

      <div className="space-y-4">
        <div className="h-5 w-1/3 bg-gray-200 rounded"></div>
        <div className="h-10 w-full bg-gray-200 rounded"></div>
        <div className="h-10 w-40 bg-gray-300 rounded mx-auto"></div>
      </div>

      <div className="space-y-6">
        {[1,2].map(i => (
          <div key={i} className="p-4 border rounded space-y-3">
            <div className="h-4 w-2/3 bg-gray-200 rounded"></div>
            <div className="h-4 w-1/2 bg-gray-200 rounded"></div>
            <div className="h-4 w-1/3 bg-gray-200 rounded"></div>
          </div>
        ))}
      </div>

    </div>
  );
}

export default MisCitasSkeleton;