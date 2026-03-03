import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import '../App.css';

import reviews from '../data/reviewsData';
import ReviewsCard from './ReviewsCard';

function Reviews() {
  return (

    <section className='w-full h-auto py-10 lg:py-10 lg:px-10 bg-cyan-50'>

      <h2 className='py-10 text-cyan-800 text-center text-4xl font-bold'>RESEÑAS</h2>

      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={20}
        loop={true}
        navigation={true}
        pagination={{ clickable: true }}
        breakpoints={{
          640: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1280: { slidesPerView: 3 }
        }}
      >
        {reviews.map((review) => (
          <SwiperSlide key={review.id}>
            <ReviewsCard
              imagen={review.imagen}
              alt={review.alt}
              nombre={review.nombre}
              rating={review.rating}
              texto={review.texto}
            />
          </SwiperSlide>
        ))}

      </Swiper>

    </section>
  );
}

export default Reviews;