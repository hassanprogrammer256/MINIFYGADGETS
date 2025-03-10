import React, { useContext, useState } from 'react'
import { AppContext } from './AppContext'
import { X } from 'react-feather'
import {motion} from "framer-motion";
import Cartitem from './Item';
import { Link } from 'react-router-dom';

const Veiwcart = () => {
     
    const {veiwcart, setveiwcart,ToggleOverflow,setpayment,cartItems,decreaseqtty,increaseqtty,RemoveItem,SubmittingOrder,quantity, setQuantity,settblcheck,setqttycheck,lastLocation} = useContext(AppContext)
     
  const calculateTotal = () => {
    return cartItems.reduce((acc, item) => {
        const qtty = quantity[item.id] || 0;
        return acc + (item.price * qtty);
       
    }, 0);}
    const totalPrice = calculateTotal()
  return (
    <motion.div 
    initial={{y:-500,opacity:0,visibility:'hidden'}}
animate={{y:0,opacity:
     1,visibility:'visible'}}
     exit={{opacity:0}}
 transition={{type:'tween',duration:.5}}
    className='fixed top-0 w-full h-full end-0 bg-modal z-20'>
        <div className="flex justify-center">
        <div className="flex flex-col justify-center bg-gray-900 md:w-[70%] pt-40 pb-5">
        <div className="flex justify-between mx-6">
        <h1 className="text-white text-center font-bold text-5xl mb-4">
    MINIFY GADGETS 
</h1>
<Link to={'/#logo'}><X size={30} className='hover:text-white cursor-pointer' onClick={() => {settblcheck(false);setqttycheck(false);ToggleOverflow()}}/></Link>
        </div>

<div
    className = "table-responsive px-4 table-light"
>
<table className="table table-light rounded-lg">
            <thead>
                <tr>
                    <th scope="col" className='font-bold text-black'>ITEM</th>
                    <th scope="col" className='font-bold text-black'>QTTY</th>
                    <th scope="col" className='font-bold text-black'>PRICE</th>
                    <th scope="col" className='font-bold text-black'>EDIT</th>
                </tr>
            </thead>
            <tbody>
{cartItems.map((e) => (<Cartitem id={e.id} name={e.name} price= {e.price} key={e.id}/>))}
                <tr>
                    <td className="font-black">TOTAL</td>
                    <td className='font-black'></td>
                    <td className='font-black'>UGX: {totalPrice.toLocaleString('en-US')}</td>
                </tr>
            </tbody>
        </table>



    <div className="flex justify-around gap-4">


<button type="button" className='bg-green-900 hover:bg-green-500 cursor-pointer text-center font-black text-white rounded-2xl md:max-w-[35%]' onClick={() => SubmittingOrder()}>ORDER NOW</button>
</div>
</div>

        </div>
        </div>
    </motion.div>
  )
}

export default Veiwcart