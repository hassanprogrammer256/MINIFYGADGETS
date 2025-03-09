import React, { useContext, useState } from 'react';
import { AppContext } from './AppContext';
import { motion } from 'framer-motion';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Wind } from 'react-feather';

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

    async function forwardOrder(codeGiven) {
    
        try {
            // Forwarding the order request
            const response = await axios.post(`${API_URL}/forwardorder`, { code: codeGiven });
    
            // Logging the response data
            console.log('Order Response:', response.data);
        } catch (error) {
            // Handling errors
            if (error.response) {
                // The request was made and the server responded with a status code
                console.error('Error Status:', error.response.status);
                console.error('Error Data:', error.response.data);
            } else if (error.request) {
                // The request was made but no response was received
                console.error('No response received:', error.request);
            } else {
                // Something happened in setting up the request
                console.error('Error Message:', error.message);
            }
        }
    }

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
    
        const customerEmail = sessionStorage.getItem('customerEmail'); // Corrected variable naming for readability
    
        // Ensure input like codegiven is defined somewhere within your component's state
        if (!codegiven) {
            console.log('Please enter OTP code');
          
            return; // Exit if no OTP was provided
        }
    
        try {
            // Send OTP verification request
            const verificationResponse = await axios.post(`${API_URL}/confirmcode`, { code: codegiven, customeremail: customerEmail });
            // Handle OTP responses
            switch (verificationResponse.data.message) {
                case 'OTP accepted':
                   
        alert('ORDER SENT SUCCESSFULLY\nTHANKS FOR SHOPPING WITH US, THE MINIFY GADGETS TEAM WILL CONTCT YOU SHORTLY')
                    
                    
                    // // Reset code and cart items if OTP is accepted
                    setcodegiven('');
                    sessionStorage.clear();
                    window.location.href = '/shop'
                    // setcartItems([]);
    
                    // Forward order request
                    break;
    
                case 'OTP expired':
                    console.log(verificationResponse.data);
                    setcodegiven(''); // Reset the OTP input field for the user
                    alert('Your OTP has expired. Please request a new one.'); // Notify the user
                    
                    break;
    
                case 'OTP is Incorrect':
                case 'No verification found for this email':
                    setcodegiven(''); // Reset the OTP input
                    setordernotsent(true); // Set the state indicating order was not sent
                    alert('invalid otp code'); // Provide feedback to the user
                   
                    break;
    
                default:
                    console.log('Unexpected response:', verificationResponse.data.message);
                   
                    break;
            }
        } catch (error) {
            // Handle error responses
            setordernotsent(true);
            console.error('Error Details:', error.response ? error.response.data : error.message);
            alert('An error occurred while processing your request. Please try again later.'); // Notify user of the error
        }
    
        // Reset the OTP input field if desired, but already done above in most scenarios
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
                        <form className="flex flex-col gap-5" onSubmit={handleSubmit} autoComplete="off">
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
                                        autoComplete="off"
                    
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