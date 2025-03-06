import React from 'react';
import Review from './Review';
import { Swiper, SwiperSlide } from 'swiper/react';
import { motion } from "framer-motion";
import 'swiper/css';
import 'swiper/css/pagination';
import { All_Images, Brands } from '../../public';

const Review_group = () => {
  return (
    <motion.div 
      initial={{ y: 50, opacity: 0 }}
      transition={{ type: 'tween', duration: .8 }}
      whileInView={{ y: 0, opacity: 1 }}
      className='bg-blue-100 py-2 my-8'
    >
      <div className="flex justify-center">
        <h2 className="text-center font-black text-black text-5xl md:text-7xl">WHAT OTHERS SAY</h2>
      </div>
      
      <Swiper
        slidesPerView={1}
        autoplay={{
          delay: 3000,
          disableOnInteraction: true, // Allows interaction with slides
        }}
        loop={true} // Enables looping of slides
        breakpoints={{
          300: {
            slidesPerView: 2,
            spaceBetween: 10
          },
          768: {
            slidesPerView: 4,
            spaceBetween: 40
          },
          1024: {
            slidesPerView: 5,
            spaceBetween: 40
          },
        }}
        className="mySwiper"
        style={{ padding: '0 20px' }} // Optional: add padding
      >
        {Brands.map((each, index) => (
          <SwiperSlide key={index}>
            <Review />
          </SwiperSlide>
        ))}
      </Swiper>
    </motion.div>
  );
};

export default Review_group;