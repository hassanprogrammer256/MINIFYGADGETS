import { Toast } from 'flowbite-react';
import React, { useContext, useEffect, useState } from 'react';
import { X } from 'react-feather';
import { motion } from "framer-motion";
import { AppContext } from './AppContext';

const MyToast = ({message,action}) => {
    const { istoast, setistoast, setveiwcart, ToggleOverflow,messagesent, setmessagesent} = useContext(AppContext);
    const [progressWidth, setProgressWidth] = useState(0);
    const duration = 5000; // Duration for the timer (5 seconds)

    useEffect(() => {
        let progressInterval;

        if (istoast) {
            setProgressWidth(0); // Reset progress width
            progressInterval = setInterval(() => {
                setProgressWidth((prev) => {
                    if (prev >= 100) {
                        clearInterval(progressInterval);
                        setistoast(false); // Hide toast after completion
                        return 100; // Ensure it caps at 100
                    }
                    return prev + (100 / (duration / 100)); // Update progress
                });
            }, 100); // Update every 100 milliseconds
        }

        return () => clearInterval(progressInterval); // Cleanup on unmount
    }, [istoast, setistoast]);

    return (
                   <motion.div
            initial={{ x: istoast ? 500 : 0, opacity: istoast ? 0 : 1, visibility: 'hidden' }}
            animate={{ x: istoast ? 0 : 500, opacity: istoast ? 1 : 0, visibility: istoast ? 'visible' : 'hidden'}}
            transition={{ type: 'tween', delay: 0, duration: .5 }}
            className='fixed top-[20%] md:w-[70%] xs:w-[90%] lg:w-[40%] z-20 bg-green-800 end-0 rounded-s-2xl '
        >
           {istoast ?  <div className="md:text-4xl text-end flex justify-between items-center py-2 text-white font-normal">
                <span>{message}</span>
                <span className='text-black hover:text-white font-bold md:text-3xl text-2xl cursor-pointer' onClick={() => {setistoast(false);setveiwcart(true);ToggleOverflow();}}>{action}
                  
                </span>
                <X size={20} className='cursor-pointer hover:text-black font-black mt-2' onClick={() => { istoast ? setistoast(false) : setmessagesent(false) }} />
            </div> : null}

            {/* Progress Bar */}
            <div className="w-full bg-gray-300 h-1 rounded-b-2xl relative">
                <div
                    style={{ width: `${progressWidth}%` }}
                    className="h-1 bg-green-500 transition-all duration-100"
                ></div>
            </div>
        </motion.div>
 
    );
}

export default MyToast;