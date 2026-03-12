function ReservarCitaSkeleton() {
  return (
    <div className="animate-pulse px-5 py-10 max-w-xl mx-auto space-y-10">

      <div className="h-10 w-1/2 bg-gray-300 rounded mx-auto"></div>
      <div className="h-5 w-2/3 bg-gray-200 rounded mx-auto"></div>

      <div className="space-y-6">
        {[1,2,3,4,5,6].map(i => (
          <div key={i} className="space-y-2">
            <div className="h-4 w-1/3 bg-gray-300 rounded"></div>
            <div className="h-10 w-full bg-gray-200 rounded"></div>
          </div>
        ))}
      </div>

      <div className="h-12 w-40 bg-gray-300 rounded mx-auto"></div>

    </div>
  );
}

export default ReservarCitaSkeleton;