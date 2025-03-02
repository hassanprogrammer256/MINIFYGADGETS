import React, { useContext } from 'react'
import { All_Images } from '../../public';
import { Table } from "flowbite-react";
import CardGroup from '../components/CardGroup';
import Shop from './Shop';
import { ShoppingBag } from 'react-feather';
import { AppContext } from '../components/AppContext';

const ViewProduct = () => {
  const {products,isLoading,setisLoading,istoast, setistoast} = useContext(AppContext)
  return (
    <>
<div className="flex flex-col gap-4 pt-48 lg:grid lg-grid-cols-12">
<div className="flex md:grid-cols-[30%_70%] bg-gray-100 relative">
  <img src= {All_Images.tab_icon} className=' w-[40%] md:w-[20%] h-[70%] lg:max-h-[70%] mx-3 '/>
  <div className="flex flex-col max-w-[90%] gap-6">
<h1 className="text-black text-3xl font-black text-center">PRODUCT NAME</h1>
<h3 className="text-gray-800 break-words text-ellipsis text-wrap">
  Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam esse labore sit atque eius ipsam, excepturi ad tempora accusantium in natus at neque possimus porro velit iste ex maxime iusto nostrum temporibus! 
</h3>
<div
  className="table-responsive px-3 hidden sm:flex"
>
  <table
    className="table table-primary"
  >
    <thead>
      <tr>
        <th scope="col">Column 1</th>
        <th scope="col">Column 2</th>
        <th scope="col">Column 3</th>
      </tr>
    </thead>
    <tbody>
      <tr className="">
        <td scope="row">R1C1</td>
        <td>R1C2</td>
        <td>R1C3</td>
      </tr>
      <tr className="">
        <td scope="row">Item</td>
        <td>Item</td>
        <td>Item</td>
      </tr>
    </tbody>
  </table>
</div>

<button className='bg-blue-900 rounded-2xl hover:bg-blue-600 text-white font-bold cursor-pointer px-2 flex justify-center text-center md:max-w-[30%]'onClick={() => setistoast(true)}>ADD TO CART</button>

  </div>
  <div className="flex justify-center">
</div>
</div>

<div className=" flex justify-center">
  <h1 className="text-center font-extrabold text-3xl">YOU MAY ALSO LIKE:</h1>
</div>
</div>
<CardGroup />
</>
  )
}

export default ViewProduct