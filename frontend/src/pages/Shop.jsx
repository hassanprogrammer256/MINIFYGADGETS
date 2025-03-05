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
          <CardGroup key={index} pdtsarr= {el.pdts}/>
        </div>
        )}
      </div>
       
      

</div>
  
  )
}

export default Shop
