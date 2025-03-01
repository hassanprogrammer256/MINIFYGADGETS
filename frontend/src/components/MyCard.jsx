import {React, useContext} from 'react'
import { Card } from "flowbite-react";
import { All_Images } from "../assets/index";
import { AppContext } from './AppContext';
import { motion } from "framer-motion";
import { ShoppingCart } from 'react-feather';

const Mycard = ({name,description,price,id}) => {

const {products,isLoading,setisLoading,istoast, setistoast,cartItems, setcartItems,AddItems} = useContext(AppContext)
return (
<motion.div
className='py-4'
>
<Card
className="md:max-w-2xl max-w-lg shadow-card cursor-pointer relative"
>
<div className="bg-blue-100">
    <a href="/veiwproduct"><img src={All_Images.headphones_100} alt="" className='rounded cursor-pointer  scale-95 hover:scale-100 transition-all shadow-card'/></a>

</div>

<a href="#">
<h5 className="text-2xl lg:text-4xl font-semibold text-black px-2 lg:px-4 text-wrap text-ellipsis break-words">
{name}
</h5>
</a>
<h6 className="text-xl lg:text-3xl font-semibold text-gray-700 px-2 lg:px-4 text-wrap text-ellipsis break-words text-start">{description}</h6>
<div className="flex">
<svg
className="h-1 w-1 text-yellow-300"
fill="currentColor"
viewBox="0 0 20 20"
xmlns="http://www.w3.org/2000/svg"
>
<path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
</svg>
<svg
className="h-5 w-5 text-yellow-300"
fill="currentColor"
viewBox="0 0 20 20"
xmlns="http://www.w3.org/2000/svg"
>
<path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
</svg>
<svg
className="h-5 w-5 text-yellow-300"
fill="currentColor"
viewBox="0 0 20 20"
xmlns="http://www.w3.org/2000/svg"
>
<path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
</svg>
<svg
className="h-5 w-5 text-yellow-300"
fill="currentColor"
viewBox="0 0 20 20"
xmlns="http://www.w3.org/2000/svg"
>
<path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
</svg>
<svg
className="h-5 w-5 text-yellow-300"
fill="currentColor"
viewBox="0 0 20 20"
xmlns="http://www.w3.org/2000/svg"
>
<path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
</svg>
<span className="ml-3 mr-2 rounded bg-cyan-100 px-2.5 py-0.5 text-xs font-semibold text-cyan-800 dark:bg-cyan-200 dark:text-cyan-800">
5.0
</span>
</div>

 <div className="xl:flex flex-col flex justify-between px-1">
<span className="md:text-2xl text-xl lg:text-4xl font-bold text-gray-900 dark:text-BLACK">UGX: {price}</span>
<button

className="rounded-lg bg-cyan-700 lg:px-5 px-2 md:py-2.5 m-2 text-center font-medium text-white hidden lg:flex hover:bg-cyan-800 focus:outline-none focus:ring-4 focus:ring-cyan-300 dark:bg-cyan-600 dark:hover:bg-cyan-700 dark:focus:ring-cyan-800 text-xl lg:text-2xl"
onClick={() => {AddItems(name,id,price,1);}}> 
Add to cart
</button>
</div>
 <div className="flex justify-between absolute top-0 end-0 w-full lg:hidden">
<div className="rounded-lg bg-blue-700 p-2 cursor-pointer "><ShoppingCart size={20} onClick={() => {AddItems(name,id,price);}}/></div>
</div>



</Card>
</motion.div>

);
}

export default Mycard
