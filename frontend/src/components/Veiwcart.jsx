import React, { useContext, useState } from 'react'
import { AppContext } from './AppContext'
import { X } from 'react-feather'
import {motion} from "framer-motion";
import {FaTrash} from "react-icons/fa";
import Cartitem from './Item';

const Veiwcart = () => {
     
    const {veiwcart, setveiwcart,ToggleOverflow,setpayment,cartItems,decreaseqtty,increaseqtty,RemoveItem,SubmittingOrder,quantity, setQuantity} = useContext(AppContext)
     
  const calculateTotal = () => {
    return cartItems.reduce((acc, item) => {
        const qtty = quantity[item.id] || 0; // default to 0 if not set
        return acc + (item.price * qtty);
    }, 0).toFixed(2);}
    const totalPrice = calculateTotal();
  return (
    <motion.div 
    initial={{y:500,opacity:0,visibility:'hidden'}}
animate={{y:veiwcart ? 0 : -500,opacity:veiwcart ? 1 : 0,visibility:veiwcart ? 'visible':'hidden'}}
 transition={{type:'tween',duration:.5}}
    className='fixed top-0 w-full h-full end-0 bg-modal z-30 '>
        <div className="flex justify-center">
        <div className="flex flex-col justify-center bg-gray-900 md:w-[70%] pt-40 pb-5">
        <div className="flex justify-between mx-6">
        <h1 className="text-white text-center font-bold text-5xl mb-4">
    MINIFY GADGETS 
</h1>
<X size={30} className='hover:text-white cursor-pointer' onClick={() => {setveiwcart(false);ToggleOverflow()}}/>
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
{cartItems.map((e) => (<Cartitem id={e.id} name={e.name} price={e.price} key={e.id}/>))}
                <tr>
                    <td className="font-black">TOTAL</td>
                    <td className='font-black'></td>
                    <td className='font-black'>UGX: {totalPrice}</td>
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