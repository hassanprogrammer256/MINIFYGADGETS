import React, { useContext, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { motion } from "framer-motion";
import 'swiper/css';
import 'swiper/css/pagination';
import { Products } from '../../public';
import { AppContext } from './AppContext';

const MyCarousel = () => {
    // Get products from the AppContext
    const { active_Product, setactive_Product, products } = useContext(AppContext);

    // State for loading spinner
    const [isLoading, setIsLoading] = useState(false);

    // Handle tab change with loading spinner
    const handleTabChange = (index) => {
        setIsLoading(true); // Start loading
        setactive_Product(index); // Set active product
        
        // Simulate a loading delay (e.g., fetching data)
        setTimeout(() => {
            setIsLoading(false); // Stop loading after the delay
        }, 500); // 500ms delay for demo purposes
    };
    
    return (
        <>
            <motion.div 
                initial={{ y: 100, opacity: 0 }}
                transition={{ type: 'tween', duration: .8 }}
                whileInView={{ y: 0, opacity: 1 }}
                className="bg-blue-100">
                
                <Swiper
                    slidesPerView={1}
                    spaceBetween={10}
                    pagination={{ clickable: true }}
                    breakpoints={{
                        300: {
                            slidesPerView: 4,
                            spaceBetween: 10
                        },
                        768: {
                            slidesPerView: 4,
                            spaceBetween: 40
                        },
                        1024: {
                            slidesPerView: 6,
                            spaceBetween: 40
                        },
                    }}
                    className="mySwiper shadow-lg lg:h-30"
                >
                    {Products.map((each, index) => (
                        <SwiperSlide
                            key={each.id}
                            className={active_Product === index ? 'bg-gray-300 my-1 flex justify-center align-content-center shadow-active-state lg:pt-3' : 'flex justify-center align-content-center rounded lg:pt-3 hover:bg-slate-500'}
                            onClick={() => handleTabChange(index)} // Update to use the new function
                        >
                            <div className="flex justify-center align-content-center rounded-circle cursor-pointer">
                                <img src={each.image} className="w-20 max-w-10 max-h-10 rounded cursor-pointer shadow-xl hidden lg:flex" />
                            </div>
                            <p className="text-center font-bold cursor-pointer text-black text-xl lg:text-2xl">{each.name}</p>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </motion.div>

            {/* Loading Spinner */}
            {isLoading && (
                <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-75 z-50">
                    <div className="animate-spin rounded-full h-24 w-24 border-t-4 border-blue-600"></div>
                </div>
            )}
        </>
    );
}

export default MyCarousel;