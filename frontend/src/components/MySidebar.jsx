import React, { useState } from 'react'
import { Sidebar } from "flowbite-react";
import { ListGroup } from "flowbite-react";
import { HiCloudDownload, HiInbox, HiOutlineAdjustments, HiUserCircle } from "react-icons/hi";
import { motion } from "framer-motion";
import { useContext } from "react";
import { AppContext } from "./AppContext";
import { All_Images,NavMenu} from '../../public';
import { X } from 'react-feather';


const MySidebar = () => {
const {ToggleMobileView,mobileMenuOpen,activeMenu, setactiveMenu} = useContext(AppContext)
return (
<>
<motion.div
initial={{x:-500,opacity:0,visibility:'hidden'}}
animate={{x:mobileMenuOpen ? 0 : -500,opacity:mobileMenuOpen ? 1 : 0,visibility:mobileMenuOpen ? 'visible':'hidden'}}
 transition={{type:'tween',duration:.5}}

className={`fixed bg-modal top-0 w-full h-screen z-20 `}>
<div className="bg-slate-800 absolute h-full start-0 flex flex-col text-black w-[80%] md:w-[75%] overflow-y-scroll">
<div className="bg-slate-950 flex justify-between p-3">
<div className="left">  <img src={All_Images.min_logo} className='cursor-pointer max-w-80 lg:max-w-96 max-h-20 lg:max-h-28'/></div>
<div className="right " onClick ={() => {ToggleMobileView()}}><X size={40}  className='text-amber-500 cursor-pointer my-2'/></div>
</div>

<div className="">
<div className="bg-slate-700 rounded-se-lg  p-4 my-4">
<h1 className="text-center font-bold text-5xl text-white">MENU</h1>
</div>
<div className="bg-slate-800   w-[95%] list-none gap-4 flex flex-col mx-3">
{NavMenu.map((each,index) =>
<a href={`${each.Link}`} key={index}><div className={activeMenu === index ? 'bg-blue-900 rounded-xl text-4xl font-extrabold p-3 cursor-pointer text-white ': 'rounded-xl text-4xl font-extrabold p-3 cursor-pointer text-white hover:bg-blue-600'}>{each.description}</div></a>)}

</div>

</div>
</div>
</motion.div>
</>


)}
export default MySidebar
