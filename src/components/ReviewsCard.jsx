import RatingStars from './RatingStars';

function ReviewsCard({ imagen, alt, nombre, rating, texto }) {

  return (
    <div className='swiper-slide'>

      <article className='w-72 lg:w-80 h-[420px] lg:h-[400px] p-6 m-6 flex flex-col justify-center items-center gap-5 border-2 border-cyan-50 bg-cyan-950 text-white rounded-lg shadow-[0_0_10px] shadow-cyan-950 hover:shadow-[0_0_20px] transition-all duration-200 ease-in-out'>

        <img src={imagen} alt={alt} loading='lazy'
          className='w-28 h-28 rounded-full drop-shadow-[0_0_5px] drop-shadow-black' />

        <h3 className='text-2xl text-center font-bold'>{nombre}</h3>

        {/* Container estrellas */}

        <div className='flex flex-row justify-center items-center gap-2'>
          <RatingStars rating={rating} />
        </div>

        {/* Texto reseña */}
        <p>{texto}</p>
      </article>

    </div>
  );
}

export default ReviewsCard;