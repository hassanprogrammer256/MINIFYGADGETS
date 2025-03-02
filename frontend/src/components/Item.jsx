import React, { useContext, useState } from 'react'
import { AppContext } from './AppContext';
import { FaTrash } from 'react-icons/fa';


const Cartitem = ({id,name,price}) => {
    
 // Initialize total state

 const {cartItems,RemoveItem,quantity, setQuantity} = useContext(AppContext)
 
  const handleQuantityChange = (id, value) => {
    cartItems.forEach(element => {
        setQuantity(prev => ({ ...prev, [id]: value }));
    });
};
return (

<tr >
<td scope="row">{name}</td>
<td>
<div className="flex justify-center">
<input 
type="number" 
min="1" 
value={quantity[id] || '' } 
onChange={(e) => handleQuantityChange(id,e.target.value)} 
className="border p-1 rounded text-black font-black quantity"

/>
</div>
</td>
<td>{(price * (quantity[id] )|| 0).toFixed(2)}</td>
<td>
<FaTrash 
size={20} 
className='text-red-500 cursor-pointer hover:text-red-400 max-w-xs font-black text-2xl' 
onClick={() => { RemoveItem(id) }} 
/>
</td>
</tr>
)}



export default Cartitem;