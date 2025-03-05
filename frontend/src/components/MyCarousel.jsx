import React, {useContext, useRef,useState} from 'react';
import {Swiper,SwiperSlide} from 'swiper/react';
import { motion } from "framer-motion";
import 'swiper/css';
import 'swiper/css/pagination';
import {Categories, Products } from '../../public';
import { AppContext } from './AppContext';

const MyCarousel = () => {

    // Get products from the AppContext and filter brands for unique ones
const {active_Product,setactive_Product,active_Brand,setactive_Brand,products} = useContext(AppContext);


    return (
<>
<motion.div 
initial ={{y:100,opacity:0}}
transition={{type:'tween',duration:.8}}
whileInView={{y:0,opacity:1}}
className="bg-blue-100">
<Swiper
slidesPerView={1}
spaceBetween={10}
pagination = {{clickable:true}}
breakpoints={{
300:{
    slidesPerView: 4,
    spaceBetween:10
    },
768:{
    slidesPerView: 4,
    spaceBetween:40
    },
1024:{
    slidesPerView: 6,
    spaceBetween:40
    },
}}
className="mySwiper shadow-lg lg:h-30"
>
{Products.map((each,index) => <SwiperSlide key={each.id} className={active_Product === index ? 'bg-gray-300 my-1 flex justify-center align-content-center shadow-active-state  lg:pt-3' : 'flex justify-center align-content-center  rounded lg:pt-3 hover:bg-slate-500'} onClick = {() => setactive_Product(index)}>
    <div className="flex justify-center align-content-center rounded-circle cursor-pointer " >

        <img src = {each.image} className="w-20 max-w-10 max-h-10 rounded cursor-pointer shadow-xl hidden lg:flex" /></div>
        <p className="text-center font-bold cursor-pointer text-black text-xl lg:text-2xl">{each.name}</p>
    
</SwiperSlide> )}
</Swiper>

</motion.div>

</>
    )
}

export default MyCarousel;