function ReservarCitaSkeleton() {
  // Arrays de objetos con id único para evitar el warning de key
  const input = [
    { id: 'input-1' },
    { id: 'input-2' },
    { id: 'input-3' },
    { id: 'input-4' },
    { id: 'input-5' },
    { id: 'input-6' }
  ];

  return (
    <div className='animate-pulse px-5 py-10 max-w-xl mx-auto space-y-10'>

      <div className='h-10 w-1/2 bg-gray-300 rounded mx-auto'></div>
      <div className='h-5 w-2/3 bg-gray-200 rounded mx-auto'></div>

      <div className='space-y-6'>
        {input.map(item => (
          <div key={item.id} className='space-y-2'>
            <div className='h-4 w-1/3 bg-gray-300 rounded'></div>
            <div className='h-10 w-full bg-gray-200 rounded'></div>
          </div>
        ))}
      </div>

      <div className='h-12 w-40 bg-gray-300 rounded mx-auto'></div>

    </div>
  );
}

export default ReservarCitaSkeleton;