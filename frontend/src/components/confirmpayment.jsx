import React, { useContext, useState } from 'react';
import { AppContext } from './AppContext';
import { motion } from 'framer-motion';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Confirmorder = () => {
    const {
        customer_email,
        setpayment,
        setcustomer_email,
        setcartItems,
        API_URL,
        setemailVerified,
        setordernotsent,
        setOTPcorrect,
        setOTPIncorrect,
        ToggleOverflow,
        confirmpayment,
        setconfirmpayment
    } = useContext(AppContext);

    const [codegiven, setcodegiven] = useState('');

    const handlePaste = (event) => {
        event.preventDefault(); // Prevent pasting
    };

    const handleCopy = (event) => {
        event.preventDefault(); // Prevent copying
    };

    const handleCut = (event) => {
        event.preventDefault(); // Prevent cutting
    };

  const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent the form from submitting the traditional way

        const email = customer_email;

        try {
            const res = await axios.post(`${API_URL}/confirmcode`, { code:codegiven, email });
    
            if ( res.data.message == 'OTP accepted') {
              console.log(res.data)
                setOTPcorrect(true);
                setpayment(false);
                setcodegiven('')
                setcartItems([])
                setCustomerOrder([]);
                window.location.href = '/shop'
                setconfirmpayment(false);
            } else if (res.data.message === 'OTP expired') {
              console.log(res.data)
              setcodegiven('')
            } else if (res.data.message == 'OTP is Incorrect' || res.data.message == "No verification found for this email") {
              console.log(res)
          setcodegiven('')
            setordernotsent(true)

            }
        } catch (error) {
          setordernotsent(true)
            console.error('Error Details:', error.response ? error.response.data : error.message);
        }

        // Reset the input field after submission
        // setcodegiven('');
    };

    return (
        <motion.div
        initial={{ y: -500, opacity: 0, visibility: 'hidden' }}
        animate={{ y: 0, opacity: 1, visibility: 'visible' }}
        exit={{ opacity: 0 }}
            className='fixed top-0 w-full h-full end-0 bg-modal z-30 bg-red-800 overflow-y-scroll scroll-be'>
            <div className="flex justify-center py-4">
                <div className="flex flex-col justify-center bg-gray-900 md:w-[70%] pt-40 pb-5 px-2">
                    <h1 className="text-white text-center font-bold text-5xl mb-4">
                        MINIFY GADGETS
                    </h1>

                    <h2 className="text-center font-bold text-xl text-gray-400 mb-4">
                        Minify Gadgets has sent an OTP(One Time Password) to your email, please check your email and enter the 6-digit password to verify your order.
                    </h2>
                    <div className="flex justify-center">
                        <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
                            <div className="flex justify-between md:px-4 px-2">
                                <div className="flex justify-between gap-3 mb-3 px-auto">
                                    <input
                                        className="text-center h-10 text-7xl tracking-wider font-bold text-black justify-center flex max-w-[75%] rounded-2xl bg-gray-300"
                                        type="text"
                                        maxLength={6}
                                        onPaste={handlePaste}
                                        onCopy={handleCopy}
                                        onCut={handleCut}
                                        value={codegiven}
                                        onChange={(e) => {setcodegiven(e.target.value.replace(/[^0-9]/g, ''));setordernotsent(false)}}
                                        id='code'
                                        autoFocus
                                        autoComplete='true'
                                        required
                                    />
                                </div>
                            </div>

                            <div className="flex justify-between w-full my-8">
                               <Link to = {'/submitorder'} className='p-3'><button
                                    type="button"
                                    className='bg-red-900 hover:bg-red-500 cursor-pointer text-center font-black text-white rounded-2xl max-w-48 p-1'
                                    onClick={() => {setordernotsent(false); setcodegiven('');}}>
                                    DISCARD
                                </button></Link> 
                                <button
                                    type="submit"
                                    className='bg-green-900 hover:bg-green-500 cursor-pointer text-center font-black text-white rounded-2xl' onClick={() => setordernotsent(false)}>
                                    SUBMIT
                                </button>
                            </div>
                        </form>
                    </div>
                    <h2 className="text-center font-bold text-xl text-gray-400 mb-4">
                        Didn’t receive the code? Click <a href='' className='text-amber-500 hover:text-red-700 underline' >HERE</a> to resend the code
                    </h2>
                </div>
            </div>
        </motion.div>
    );
};

export default Confirmorder;