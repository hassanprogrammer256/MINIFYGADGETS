import React from 'react'
import { ArrowRight } from 'react-feather'
import { Label, TextInput } from "flowbite-react";
import { HiMail,HiSearch } from "react-icons/hi";
import { All_Images } from '../../public';

const Shop_Hero = () => {
  return (
<div className="pt-40 flex flex-col bg-shop-hero justify-center ">
    <div className="flex flex-col gap-4"> <h1 className="lg:text-7xl text-5xl font-medium text-white text-center text-wrap break-words">WHAT GADGET ARE YOU <span className='text-amber-500 font-black'>LOOKING FOR ?</span></h1>
<div className="flex flex-col justify-center">
<div className="flex justify-center px-4 lg:py-2">
<div className="form-group w-[50%] relative ">
<input className="text-center px-3 rounded-3xl" name="contact-name" id="contact-name" />
<HiSearch size={30} className='absolute top-2 end-0 text-purple-900 font-black cursor-pointer hidden md:flex'/>
<HiSearch size={20} className='absolute top-2 end-0 text-purple-900 font-black cursor-pointer flex md:hidden'/> 

</div>

</div>


</div>
    
    </div>
   
 
  
</div>
  )
}

export default Shop_Hero