function HomeSkeleton() {
  return (
    <div className="animate-pulse space-y-16 px-5 py-10">

      {/* Hero */}
      <div className="flex flex-col lg:flex-row items-center gap-10">
        <div className="space-y-4 w-full">
          <div className="h-10 w-2/3 bg-gray-300 rounded"></div>
          <div className="h-6 w-1/2 bg-gray-200 rounded"></div>
          <div className="h-10 w-40 bg-gray-300 rounded"></div>
        </div>
        <div className="hidden lg:block w-1/2 h-64 bg-gray-200 rounded"></div>
      </div>

      {/* Servicios */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[1,2,3].map(i => (
          <div key={i} className="p-6 border rounded-lg space-y-4">
            <div className="h-32 bg-gray-200 rounded"></div>
            <div className="h-6 w-1/2 bg-gray-300 rounded"></div>
            <div className="h-4 w-full bg-gray-200 rounded"></div>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="h-40 bg-gray-200 rounded"></div>

      {/* Profesionales */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[1,2].map(i => (
          <div key={i} className="p-6 border rounded-lg space-y-4">
            <div className="h-40 bg-gray-200 rounded"></div>
            <div className="h-6 w-1/2 bg-gray-300 rounded"></div>
            <div className="h-4 w-3/4 bg-gray-200 rounded"></div>
          </div>
        ))}
      </div>

      {/* Reviews */}
      <div className="h-48 bg-gray-200 rounded"></div>

      {/* Contacto */}
      <div className="space-y-4">
        <div className="h-6 w-1/3 bg-gray-300 rounded"></div>
        <div className="h-4 w-2/3 bg-gray-200 rounded"></div>
        <div className="h-64 bg-gray-200 rounded"></div>
      </div>

    </div>
  );
}

export default HomeSkeleton;