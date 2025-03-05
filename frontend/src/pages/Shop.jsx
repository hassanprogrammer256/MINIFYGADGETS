import React, {useContext, useEffect, useState} from 'react';
import 'swiper/css';
import 'swiper/css/pagination';
import { motion } from "framer-motion";
import {Swiper,SwiperSlide} from "swiper/react";
import {Pagination} from "swiper/modules";
import MyCarousel from '../components/MyCarousel'
import { AppContext } from '../components/AppContext';
import Shop_Hero from '../components/Shop_Hero';
import Mycard from '../components/MyCard';



const Shop = () => {
  const {API_URL,active_Product,setactive_Product,active_Brand,setactive_Brand,currentLocation,searchTerm, setsearchTerm,products} = useContext(AppContext)

  const pdtData = [];

  products.forEach(pt => {
    // Use filter to get all products in the same subcategory
    const pdts = products.filter(obj => obj.subcategory === pt.subcategory);
  
    // Check if the category already exists in pdtData
    const exists = pdtData.some(el => el.category === pt.subcategory);
  
    // If it does not exist, push the new item to pdtData
    if (!exists) {
      const item = {
        category: pt.subcategory,
        products: pdts
      };
      pdtData.push(item);
    }
  });
  
  console.log(pdtData);
  return (
    <div >
      {currentLocation == '/' ? <h1 className="text-center font-black text-ellipsis break-words text-wrap text-white lg:text-6xl uppercase mb-0 sm:text-5xl text-3xl">WE OFFER VARIETY OF PRODUCTS</h1> : 
<Shop_Hero />}

      <MyCarousel />
      <div className="">
      {pdtData.map((el,index) =>
        <div key={index}>
          <motion.h2 
          initial ={{y:10,opacity:0}}
          animate = {{y:0,opacity:1}}
          className="text-left font-extrabold text-white text-3xl lg:text-5xl px-2 lg:px-4 ">{el.category}</motion.h2>
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
      {pdtData.slice(0,10).map((e, index) => (
       <SwiperSlide key={index} className="swiper-slide-custom">
      { pdtData.products.map((e) => <Mycard
      key={e.id}
           id={e.id}
           description={(e.description).length > 50 ? (e.description).substring(0, 50) + '...' : e.description}
           name={(e.name).length > 20 ? (e.name).substring(0, 20) + '...' : e.name}
           price={Number((e.price * STANDARD_UGX_RATE).toFixed(0)).toLocaleString('en-US')} // Formatting price with commas
           shipping_fee={Number((e.shipping * STANDARD_UGX_RATE).toFixed(0)).toLocaleString('en-US')} // Formatting shipping fee with commas
           img={e.image ? e.image : All_Images.min_logo}
       />)}
   </SwiperSlide>
      ))}
    </Swiper>

      </motion.div>


        </div>
        )}
      </div>
       
      

</div>
  
  )
}

export default Shop
