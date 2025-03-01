import React, { useContext, useRef, useState } from 'react';
// import required modules
import Mycard from './MyCard';
import { Categories } from '../assets';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import { motion } from "framer-motion";
import 'swiper/css/pagination';
import { AppContext } from './AppContext';


const CardGroup = () =>{
const {products} = useContext(AppContext)

  return (
    <>
    <motion.div
    initial ={{x:100,opacity:0}}
    transition={{type:'tween',duration:.8}}
    whileInView={{x:0,opacity:1}}
    >
    <Swiper
        slidesPerView={2}
     
        spaceBetween={10}
        pagination={{
          clickable: true,
        }}
breakpoints={{
300:{
  slidesPerView: 1,
    spaceBetween:50
},
576:{
    slidesPerView: 2,
    spaceBetween:20
    },
768:{
    slidesPerView: 2,
    spaceBetween:30
    },
1024:{
    slidesPerView: 3,
    spaceBetween:10
    },
}}
className="mySwiper py-5"
      >
        {products.map((e,index) => <SwiperSlide key={index}><Mycard c_qtty={1} id = {e.id} description={e.description} name={e.title} price={e.price}/></SwiperSlide>)}
      </Swiper>
    </motion.div>

    </>
  );
}

export default CardGroup;
