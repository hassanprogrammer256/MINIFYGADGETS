import { Toast } from 'flowbite-react';
import React, { useContext, useEffect, useState } from 'react';
import { X } from 'react-feather';
import { motion } from "framer-motion";
import { AppContext } from './AppContext';

const Note = ({message}) => {
    const { alerting,setalerting,setistoast,qttycheck,setqttycheck,tblcheck,settblcheck,ordernotsent,setordernotsent} = useContext(AppContext);
    const [progressWidth, setProgressWidth] = useState(0);
    const duration = 5000; // Duration for the timer (5 seconds)

    useEffect(() => {
        let progressInterval;

        if (alerting ) {
            setistoast(false)
            setProgressWidth(0); // Reset progress width
            progressInterval = setInterval(() => {
                setProgressWidth((prev) => {
                    if (prev >= 100) {
                        clearInterval(progressInterval);
                        setalerting(false); // Hide toast after completion
                        return 100; // Ensure it caps at 100
                    }
                    return prev + (100 / (duration / 100)); // Update progress
                });
            }, 100); // Update every 100 milliseconds
        }

        return () => clearInterval(progressInterval); // Cleanup on unmount
    }, [alerting, setalerting]);

    return (
                   <motion.div
            initial={{ y: alerting ? -400 : qttycheck ? 700 : tblcheck ? 500: ordernotsent ? -400 :0, opacity: alerting ? 0 :qttycheck ? 0 :tblcheck ? 0 :ordernotsent ? 0 :  1, visibility: 'hidden' }}
            animate={{ y: alerting ? 0: qttycheck ? 0 : tblcheck ? 0:ordernotsent ? 0 : 700, opacity: alerting ? 1 : qttycheck ? 1 :tblcheck ? 1: ordernotsent ? 1 : 0, visibility: alerting ? 'visible':qttycheck ?'visible' : tblcheck ? 'visible' : ordernotsent ? 'visible' : 'hidden'}}
            transition={{ type: 'tween', delay: 0, duration: .5 }}
            className='fixed top-[20%] md:w-[70%] xs:w-[90%] lg:w-[40%] z-50 bg-amber-400 end-0 rounded-s-2xl '
        >
            <div className="md:text-4xl text-end flex justify-between items-center py-2 text-white font-normal px-4">
                <span>{message}</span>
              
                <X size={20} className='cursor-pointer hover:text-black font-black mt-2' onClick={() => { setalerting(false) || setqttycheck(false)|| settblcheck(false) || setordernotsent(false)}} />
            </div>

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

export default Note;