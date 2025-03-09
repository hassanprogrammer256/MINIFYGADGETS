import React, { useContext, useEffect, useState } from 'react';
import 'swiper/css';
import 'swiper/css/pagination';
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import MyCarousel from '../components/MyCarousel';
import { AppContext } from '../components/AppContext';
import Shop_Hero from '../components/Shop_Hero';
import MyCard from '../components/MyCard';
import { All_Images, Products } from '../../public';

const Shop = () => {
  const { STANDARD_UGX_RATE, API_URL, active_Product, setactive_Product, active_Brand, setactive_Brand, currentLocation } = useContext(AppContext);

  const [products, setproducts] = useState([]);
  const [searchTerm, setsearchTerm] = useState('');
  const [isLoading, setisLoading] = useState(false);
  const pdtData = [];

  const getData = async () => {
    try {
      setisLoading(true);
      const response = await fetch(`${API_URL}/search`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          q: Products[active_Product].name, // Send search term in the body
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json(); // Parse the JSON response
      setproducts(data); // Set products with the fetched data
    } catch (err) {
      console.error('Error fetching data:', err);
    } finally {
      setisLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, [active_Product]);

  // Prepare categorized products
  products.forEach(pt => {
    const pdts = products.filter(obj => obj.subcategory === pt.subcategory);
    if (!pdtData.some(el => el.category === pt.subcategory)) {
      pdtData.push({ category: pt.subcategory, products: pdts });
    }
  });

  const hasProducts = pdtData.length > 0;

  // Function to chunk products into groups of n
  const chunkArray = (arr, size) => {
    const result = [];
    for (let i = 0; i < arr.length; i += size) {
      result.push(arr.slice(i, i + size));
    }
    return result;
  };

  return (
    <motion.div
    initial={{ opacity: 0, scale: .2 }} // Start scaling down and fully transparent
      animate={{ opacity: 1, scale: 1 }} // Scale back to normal and fully opaque
      exit={{ opacity: 0, scale: 0 }} // Scale down and become transparent when exiting
      transition={{ duration: 1,type:'spring', bounce:.2 }} // Duration of the transition
    >
      {currentLocation === '/' ? (
        <h1 className="mt-10 text-center font-black text-ellipsis break-words text-wrap text-gray-300 lg:text-6xl uppercase mb-3 sm:text-5xl text-3xl">
          WE OFFER VARIETY OF PRODUCTS
        </h1>
      ) : (
        <Shop_Hero />
      )}
      <MyCarousel />
      {isLoading ? (
        <div className="flex items-center justify-center">
          <div className="animate-spin rounded-full h-20 w-20 border-4 border-t-8 border-green-500 border-t-transparent"></div>
        </div>
      ) : (
        <>
          {!hasProducts ? (
            <h1 className="text-center font-black text-3xl lg:text-6xl text-white mt-10">
              No Items Found
            </h1>
          ) : (
            <div>
              {pdtData.map((el, index) => {
                const productChunks = chunkArray(el.products.slice(0, 20), 10); // Get chunks of 10 products
                return (
                  <div key={index}>
                    <motion.h2
                      initial={{ y: 10, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      className="text-left font-extrabold text-gray-300 text-3xl lg:text-5xl px-2 lg:px-4">
                      {el.category}
                    </motion.h2>
                    <motion.div
                      initial={{ x: 100, opacity: 0 }}
                      transition={{ type: 'tween', duration: 0.8 }}
                      whileInView={{ x: 0, opacity: 1 }}
                    >
                      {productChunks.map((chunk, chunkIndex) => (
                        <Swiper
                          key={chunkIndex}
                          spaceBetween={10}
                          pagination={{
                            clickable: true,
                          }}
                          breakpoints={{
                            300: {
                              slidesPerView: 2,
                              spaceBetween: 10,
                            },
                            576: {
                              slidesPerView: 3,
                              spaceBetween: 10,
                            },
                            768: {
                              slidesPerView: 3,
                              spaceBetween: 10,
                            },
                            1024: {
                              slidesPerView: 4,
                              spaceBetween: 10,
                            },
                          }}
                          className="mySwiper py-5"
                        >
                          {/* Map through the chunk of products */}
                          {chunk.map((e) => (
                            <SwiperSlide key={e._id} className="swiper-slide-custom">
                              <MyCard
                               id={e._id}
                               description={(e.description)}
                               name={(e.productName)}
                               price={Number((e.price * STANDARD_UGX_RATE).toFixed(0))}
                               img={e.productImage}
                              />
                            </SwiperSlide>
                          ))}
                        </Swiper>
                      ))}
                    </motion.div>
                  </div>
                );
              })}
            </div>
          )}
        </>
      )}
    </motion.div>
  );
};

export default Shop;