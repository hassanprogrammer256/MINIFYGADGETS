import React, { useContext } from 'react'
import { All_Images } from '../../public';
import CardGroup from '../components/CardGroup';
import { AppContext } from '../components/AppContext';
import { useParams } from "react-router-dom";

const ViewProduct = () => {
  const {STANDARD_UGX_RATE,products,isLoading,setisLoading,istoast, setistoast,cartItems, setcartItems,AddItems,alert,setalert,addingitem, setaddingitem} = useContext(AppContext)
  let alreadyincart = []
const {id} = useParams()
let pdt = products.find(p => p.id === id);

  return (
    <>
<div className="flex flex-col gap-4 pt-48 lg:grid lg-grid-cols-12">
<div className="flex md:grid-cols-[30%_70%] bg-gray-100 relative">
  <img src= {pdt.image} className=' w-[40%] md:w-[20%] h-[70%] lg:max-h-[70%] mx-3 '/>
  <div className="flex flex-col max-w-[90%] gap-6">
<h1 className="text-black text-3xl font-black text-center">{pdt.name}</h1>
<h3 className="text-gray-800 break-words text-ellipsis text-wrap">
  {pdt.description}
</h3>
<div
  className="table-responsive px-3 hidden sm:flex"
>
  <table
    className="table table-primary"
  >
    <thead>
      <tr>
        <th scope="col">MODEL</th>
        <th scope="col">MANUFACTURER</th>
        <th scope="col">RATINGS</th>
      </tr>
    </thead>
    <tbody>
      <tr className="">
        <td scope="row">{pdt.model}</td>
        <td>{pdt.manufacturer}</td>
        <td>5</td>
      </tr>
    </tbody>
  </table>
</div>

<button className='bg-blue-900 rounded-2xl hover:bg-blue-600 text-white font-bold cursor-pointer px-2 flex justify-center text-center md:max-w-[30%]'onClick={() => {alreadyincart.includes(id) ?setalert(true): AddItems(pdt.name,pdt.id,((pdt.price) * STANDARD_UGX_RATE ).toFixed(0));}}>{addingitem ? 'Adding...': alreadyincart.includes(id) ? 'Added to cart':'Add to Cart'}</button>

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