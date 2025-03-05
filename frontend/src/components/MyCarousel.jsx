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


</>
    )
}

export default MyCarousel;