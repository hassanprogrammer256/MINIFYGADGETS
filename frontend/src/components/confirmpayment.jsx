import React, { useContext, useState } from 'react'
import { AppContext } from './AppContext';
import { motion } from "framer-motion";
import axios from 'axios';

const Confirmorder = () => {
const {customer_email, setcustomer_email,getData,API_URL,setemailVerified, setveiwcart,setpayment,ordernotsent, setordernotsent,OTPcorrect,setOTPcorrect,OTPIncorrect,setOTPIncorrect,OTPexpired,setOTPexpired,ToggleOverflow,confirmpayment,setconfirmpayment} = useContext(AppContext)

const handleSubmit = async (e) => {
  e.preventDefault(); // Prevent the form from submitting the traditional way

  let code = document.getElementById('code').value;
  const email = customer_email;
  console.log('Code:', code);
  console.log('Email:', email);
  
  try {
    const res = await axios.post(`${API_URL}/confirmcode`, { code, email });
    console.log('Server Response:', res);
  
    if (res.data.message === 'OTP accepted' && res.status === 200) {
      console.log('OTP Accepted');
      setOTPcorrect(true);
      alert('OTP TRUE');
    } else if (res.data.message === 'OTP expired' || res.status === 500) {
      setemailVerified(false);
      alert('CODE EXPIRED');
    } else if (res.data.message === 'OTP is Incorrect' || res.status === 404) {
      setemailVerified(false);
      alert('INCORRECT CODE');
    }
  } catch (error) {
    console.error('Error Details:', error.response); // Includes status and message
  }
};

return (

    <motion.div 
    initial={{y:500,opacity:0,visibility:'hidden'}}
    animate={{y:confirmpayment ? 0 : -500,opacity:confirmpayment ? 1 : 0,visibility:confirmpayment ? 'visible':'hidden'}}
    transition={{type:'tween',duration:.5}}
    className='fixed top-0 w-full h-full end-0 bg-modal z-30 bg-red-800 overflow-y-scroll scroll-be'>
    <div className="flex justify-center py-4">
    <div className="flex flex-col justify-center bg-gray-900 md:w-[70%] pt-40 pb-5 px-2">
    <h1 className="text-white text-center font-bold text-5xl mb-4">
    MINIFY GADGETS 
    </h1>

<h2 className="text-center font-bold text-xl text-gray-400 text-ellipsis text-wrap break-words mb-4">
    Minify Gadgets has sent an OTP(One Time Password) on your email, please  Check your email and enter the 6 digit password to verify your order
</h2>
<div className="flex justify-center">
<form className="flex flex-col gap-5"onSubmit={handleSubmit}>
  <div className="flex justify-between md:px-4 px-2">
  <div className="flex justify-between gap-3 mb-3 px-auto">
<input className=" text-center h-10 text-7xl tracking-wider font-bold text-black justify-center flex max-w-[75%] rounded-2xl bg-gray-300" type="text" maxLength={6} id ='code' autoFocus autoComplete='true'/>
</div>
  </div>

<div className="flex justify-between w-full my-8">
    <button type="button" className='bg-red-900 hover:bg-red-500 cursor-pointer text-center font-black text-white rounded-2xl max-w-48 ' onClick={() => {setconfirmpayment(false);ToggleOverflow();}}>DISCARD</button>
 <button type="submit" className='bg-green-900 hover:bg-green-500 cursor-pointer text-center font-black text-white rounded-2xl' >SUBMIT</button>
    </div>
    </form>
</div>
<h2 className="text-center font-bold text-xl text-gray-400 text-ellipsis text-wrap break-words mb-4">
  Didn`t recieve the code ? Click <a href="" className='text-amber-500 hover:text-red-700 cursor-pointer ms-2 underline'>HERE</a>
</h2>

    </div>
    </div>
    </motion.div>
  )
}

export default Confirmorder;
