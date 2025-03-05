import React, {useContext, useEffect, useState} from 'react';
import 'swiper/css';
import 'swiper/css/pagination';
import { motion } from "framer-motion";
import MyCarousel from '../components/MyCarousel'
import { AppContext } from '../components/AppContext';
import CardGroup from '../components/CardGroup';
import { Categories } from '../../public';
import Shop_Hero from '../components/Shop_Hero';


const Shop = () => {
  const {API_URL,active_Product,setactive_Product,active_Brand,setactive_Brand,currentLocation,searchTerm, setsearchTerm,products} = useContext(AppContext)

   const pdtData = []
  
  products.forEach(product =>{
      if (pdtData.includes(product.subcategory)){
          null
      }else{
          let pdts = products.filter(obj => obj.subcategory === product.subcategory)
          const item = {
            category: product.subcategory,
            products: pdts
          }
            pdtData.push(item)
      }
  })

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
          {pdts.slice(0,10).map((e, index) => (
           <SwiperSlide key={index} className="swiper-slide-custom">
           <Mycard
               id={e.id}
               description={(e.description).length > 50 ? (e.description).substring(0, 50) + '...' : e.description}
               name={(e.name).length > 20 ? (e.name).substring(0, 20) + '...' : e.name}
               price={Number((e.price * STANDARD_UGX_RATE).toFixed(0)).toLocaleString('en-US')} // Formatting price with commas
               shipping_fee={Number((e.shipping * STANDARD_UGX_RATE).toFixed(0)).toLocaleString('en-US')} // Formatting shipping fee with commas
               img={e.image ? e.image : All_Images.min_logo}
           />
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
