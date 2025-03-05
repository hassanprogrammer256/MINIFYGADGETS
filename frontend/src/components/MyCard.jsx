import { React, useContext } from 'react';
import { Card } from "flowbite-react";
import { FaCheckCircle } from "react-icons/fa";
import { AppContext } from './AppContext';
import { motion } from "framer-motion";
import { ShoppingCart } from 'react-feather';
import { Link } from 'react-router-dom';

const Mycard = ({ name, description, price, id, img, shipping_fee }) => {
    const { cartItems, AddItems, alert, setalert, addingitem } = useContext(AppContext);
    
    let alreadyincart = cartItems.map(element => element.id).includes(id);

    return (
        <motion.div className='py-4'>
            <Card className="md:max-w-2xl max-w-lg max-h-max shadow-card cursor-pointer relative bg-blue-100">
                <div className="grid grid-rows-1 grid-cols-1">
                    <div className="bg-blue-100 mb-2 w-full">
                        <Link to={`/veiwproduct/${id}`} className='image-container '>
                            <img src={img} alt="" className='rounded cursor-pointer scale-95 hover:scale-100 transition-all shadow-card' />
                        </Link>
                    </div>

                    <div className="flex flex-col text-start px-2 lg:px-4 text-wrap text-ellipsis break-words mb-1">
                        <h5 className="text-2xl lg:text-4xl font-black text-black">{name}</h5>
                        <h6 className="text-xl lg:text-3xl font-semibold text-gray-700 text-start">{description}</h6>
                    </div>

                    <div className="grid grid-rows-1 md:grid-rows-1 gap-2">
                        <div className="flex  items-center space-x-2">
                            <div className="flex space-x-1">
                                {[...Array(5)].map((_, index) => (
                                    <svg key={index} className={`h-5 w-5 text-yellow-300`} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                ))}
                            </div>
                            <span className="rounded bg-cyan-100 px-2.5 py-0.5 text-xs font-semibold text-cyan-800">
                                5.0
                            </span>
                        </div>

                        <div className="flex items-center flex-col mt-9">
                            <span className="md:text-2xl text-xl lg:text-4xl font-bold text-gray-900 flex flex-col lg:flex-row">
                                UGX: {price}
                            </span>
                            <span className='bg-[#07ED00] font-medium text-red-600 rounded-3xl mb-3 hover:bg-green-600 transition-all p-2 text-lg'>
                                    + shipping fee: UGX{shipping_fee}
                                </span>
                            <button
                                className="rounded-lg bg-cyan-700 lg:px-5 px-2 md:py-2.5 m-2 text-center font-medium text-white hidden lg:flex hover:bg-cyan-800 focus:outline-none focus:ring-4 focus:ring-cyan-300 dark:bg-cyan-600 dark:hover:bg-cyan-700 dark:focus:ring-cyan-800 text-xl lg:text-2xl"
                                onClick={() => { alreadyincart ? setalert(true) : AddItems(name, id, price); }}>
                                {addingitem ? 'Adding...' : alreadyincart ? 'Added to cart' : 'Add to Cart'}
                            </button>
                        </div>
                    </div>

                    <div className="flex justify-between absolute top-0 end-0 w-full lg:hidden">
                        <div className="rounded-lg bg-blue-700 p-2 cursor-pointer ">
                            {alreadyincart ? 
                                <FaCheckCircle size={20} onClick={() => { alreadyincart ? setalert(true) : AddItems(name, id, price); }} /> : 
                                <ShoppingCart size={20} onClick={() => { alreadyincart ? setalert(true) : AddItems(name, id, price); }} />
                            }
                        </div>
                    </div>
                </div>
            </Card>
        </motion.div>
    );
}

export default Mycard;