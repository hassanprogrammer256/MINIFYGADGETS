import React, { useContext } from 'react';
// Import required modules
import Mycard from './MyCard';
import { AppContext } from './AppContext';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import { motion } from "framer-motion";
import { All_Images,} from "../../public/index";

import 'swiper/css/pagination';


const CardGroup = () => {
  const { products,active_Product, setactive_Product,STANDARD_UGX_RATE} = useContext(AppContext);

;
  return (
    <>
      <motion.div
        initial={{ x: 100, opacity: 0 }}
        transition={{ type: 'tween', duration: .8 }}
        whileInView={{ x: 0, opacity: 1 }}
      >
        <Swiper
      
          spaceBetween={10}
          pagination={{
            clickable: true,
          }}
          breakpoints={{
            300: {
              slidesPerView: 2,
              spaceBetween: 10
            },
            576: {
              slidesPerView: 2,
              spaceBetween: 20
            },
            768: {
              slidesPerView: 3,
              spaceBetween: 30
            },
            1024: {
              slidesPerView: 4,
              spaceBetween: 10
            },
          }}
          className="mySwiper py-5"
        >
          {products.slice(0,10).map((e, index) => (
           <SwiperSlide key={index} className="swiper-slide-custom">
           <Mycard
               id={e.id}
               description={e.description}
               name={e.name}
               price={Number((e.price * STANDARD_UGX_RATE).toFixed(0)).toLocaleString('en-US')} // Formatting price with commas
               shipping_fee={Number((e.shipping * STANDARD_UGX_RATE).toFixed(0)).toLocaleString('en-US')} // Formatting shipping fee with commas
               img={e.image ? e.image : All_Images.min_logo}
           />
       </SwiperSlide>
          ))}
        </Swiper>
      </motion.div>
    </>
  );
}

export default CardGroup;