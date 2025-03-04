import { Toast } from 'flowbite-react';
import React, { useContext, useEffect, useState } from 'react';
import { X } from 'react-feather';
import { motion } from "framer-motion";
import { AppContext } from './AppContext';

const Note = ({message}) => {
    const { alert,setalert,setistoast} = useContext(AppContext);
    const [progressWidth, setProgressWidth] = useState(0);
    const duration = 5000; // Duration for the timer (5 seconds)

    useEffect(() => {
        let progressInterval;

        if (alert) {
            setistoast(false)
            setProgressWidth(0); // Reset progress width
            progressInterval = setInterval(() => {
                setProgressWidth((prev) => {
                    if (prev >= 100) {
                        clearInterval(progressInterval);
                        setalert(false); // Hide toast after completion
                        return 100; // Ensure it caps at 100
                    }
                    return prev + (100 / (duration / 100)); // Update progress
                });
            }, 100); // Update every 100 milliseconds
        }

        return () => clearInterval(progressInterval); // Cleanup on unmount
    }, [alert, setalert]);

    return (
                   <motion.div
            initial={{ y: alert ? -400 : 0, opacity: alert ? 0 : 1, visibility: 'hidden' }}
            animate={{ y: alert ? 0 : -400, opacity: alert ? 1 : 0, visibility: alert ? 'visible' : 'hidden'}}
            transition={{ type: 'tween', delay: 0, duration: .5 }}
            className='fixed top-[20%] md:w-[70%] xs:w-[90%] lg:w-[40%] z-20 bg-amber-400 end-0 rounded-s-2xl '
        >
            <div className="md:text-4xl text-end flex justify-between items-center py-2 text-white font-normal px-4">
                <span>{message}</span>
              
                <X size={20} className='cursor-pointer hover:text-black font-black mt-2' onClick={() => { setalert(false); }} />
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