import { Toast } from 'flowbite-react';
import React, { useContext, useEffect, useState } from 'react';
import { X } from 'react-feather';
import { motion } from "framer-motion";
import { AppContext } from './AppContext';

const OtpCorrect = () => {
    const {setOTPcorrect,OTPcorrect} = useContext(AppContext);
    const [progressWidth, setProgressWidth] = useState(0);
    const duration = 5000; // Duration for the timer (5 seconds)

    useEffect(() => {
        let progressInterval;

        if (OTPcorrect) {
            setProgressWidth(0); // Reset progress width
            progressInterval = setInterval(() => {
                setProgressWidth((prev) => {
                    if (prev >= 100) {
                        clearInterval(progressInterval);
                        setOTPcorrect(false); // Hide toast after completion
                        return 100; // Ensure it caps at 100
                    }
                    return prev + (100 / (duration / 100)); // Update progress
                });
            }, 100); // Update every 100 milliseconds
        }

        return () => clearInterval(progressInterval); // Cleanup on unmount
    }, [OTPcorrect, setOTPcorrect]);

    return (
                   <motion.div
            initial={{ x: OTPcorrect ? 500 : 0, opacity: OTPcorrect ? 0 : 1, visibility: 'hidden' }}
            animate={{ x: OTPcorrect ? 0 : 500, opacity: OTPcorrect ? 1 : 0, visibility: OTPcorrect ? 'visible' : 'hidden'}}
            transition={{ type: 'tween', delay: 0, duration: .5 }}
            className='fixed top-[20%] md:w-[70%] xs:w-[90%] lg:w-[40%] z-20 bg-green-800 end-0 rounded-s-2xl '
        >
         <div className="md:text-4xl text-end flex justify-between items-center py-2 text-white font-normal">
                <span>Order placed Successfully</span>
               
                <X size={20} className='cursor-pointer hover:text-black font-black mt-2' onClick={() => setOTPcorrect(false)} />
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

export default OtpCorrect;