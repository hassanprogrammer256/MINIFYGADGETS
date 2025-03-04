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
              slidesPerView: 3,
              spaceBetween: 10
            },
          }}
          className="mySwiper py-5"
        >
          {products.slice(0,10).map((e, index) => (
            <SwiperSlide key={index} className="swiper-slide-custom">
              <Mycard
                id={e.id}
                description={(e.description).length > 50 ? (e.description).substring(0, 50) :e.description}
                name={(e.name).length > 20 ? (e.name).substring(0, 20) :e.name}
                price={(e.price * STANDARD_UGX_RATE).toFixed(0)}
                shipping_fee={(e.shipping * STANDARD_UGX_RATE).toFixed(0) }
                img={e.image && active_Product === 0 ?All_Images.tab_icon : active_Product === 1 ? All_Images.tv_icon: active_Product === 2 ? All_Images.tab_icon  : active_Product === 3 ? All_Images.speakers_icon : active_Product === 4 ? All_Images.tab_icon :  active_Product === 5 ? All_Images.laptop_icon : active_Product === 6 ? All_Images.gamepad_icon : active_Product === 7 ? All_Images.home_appliances_icon : All_Images.accessories_icon}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </motion.div>
    </>
  );
}

export default CardGroup;