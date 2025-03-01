import React from 'react'
import {ArrowRight, Instagram,Facebook,Mail} from "react-feather";
import {FaMapMarkerAlt,FaGoogle} from "react-icons/fa";
import { All_Images} from '../assets/index';
import {motion} from "framer-motion";
const Hero = () => {
  return (
<>
    <div className='
    md:grid md:grid-cols-[50%_50%] 2xl:grid-cols-[50%_50%] flex  gap-4 flex-col-reverse pt-52 '>
        {/* --left-- */}
      <div className="flex flex-col gap-2 lg:pt-10 pt-1 justify-center align-middle lg:ps-5 ps-3">
<h2 className=" text-lg font-medium">WELCOME TO </h2>

<motion.h1
initial ={{x:-100,opacity:0}}
transition={{type:'tween',duration:.2}}
whileInView={{x:0,opacity:1}}
 className="text-purple-500 md:text-6xl font-black uppercase mb-3 sm:text-6xl text-5xl">MINIFY <span className='text-amber-500'>GADGETS</span></motion.h1>


<motion.p 
initial = {{y:-200,opacity: 0}}
whileInView={{y:0,opacity: 1}}
transition={{type:'spring', duration:.8,bounce:.2}}
className="text-gray-100 font-normal text-3xl leading-10">Explore the Latest Phones,Electronics and Gadgets designed for you. Upgrade to Smarter living with compact and powerful devices. Experience Innovation redefined with gadgets designed for you. Simplify your tec and Elevate your life. we are the best in modern electronics delivered to your finger tips</motion.p>

<a href="/shop"> <div className="hidden sm:flex gap-4 py-5 text-center">
    
    <motion.button 
initial ={{x:-50,opacity:0}}
transition={{type:'tween',duration:.1}}
whileInView={{x:0,opacity:1}}
whileHover={{y:-5}}

    className='rounded max-w-[70%] bg-green-900 action_btn_1 justify-center text-white font-bold p-2 flex gap-3 hover:translate-y-1 '>ORDER NOW <ArrowRight size={30}/> </motion.button>
</div></a>

</div>


      {/* ---right-- */}
      <div className="flex bg-hero justify-evenly px-3 bg-hero">
        {/* <img src={All_Images.hassan} alt="" className='w-96 md:max-h-[95%] lg:w-96 hidden md:flex'/> */}
<div className="flex-col flex gap-4 font-extrabold  align-middle justify-center">
<motion.div 
initial ={{opacity:0}}
transition={{type:'tween',duration:.1,delay:0}}
whileInView={{opacity:1}}
whileHover={{x:-15}}
className="justify-center rounded-full p-2 media-contacts hidden lg:flex"><Facebook size={30} color='white' className='cursor-pointer' /></motion.div>
<motion.div
initial ={{opacity:0}}
transition={{type:'spring',duration:.1,delay:0}}
whileInView={{opacity:1}}
whileHover={{x:-15}}
className="justify-center rounded-full media-contacts hidden lg:flex p-2"><Instagram size={30} color='white' className='cursor-pointer' /></motion.div>
<motion.div 
initial ={{opacity:0}}
whileInView={{opacity:1}}
transition={{type:'spring',duration:.1,delay:0}}
whileHover={{x:-15}}
className="justify-center rounded-full media-contacts hidden lg:flex p-2"><Mail size={30} color='white' className='cursor-pointer' /></motion.div>
<motion.div
initial ={{opacity:0}}
transition={{type:'tween',duration:.1,delay:0}}
whileInView={{opacity:1}}
whileHover={{x:-15}}
className="justify-center rounded-full media-contacts hidden lg:flex p-2"><FaMapMarkerAlt size={30} color='white' className='cursor-pointer' /></motion.div>

</div>
      </div>
    </div>
    </>
  )
}

export default Hero
