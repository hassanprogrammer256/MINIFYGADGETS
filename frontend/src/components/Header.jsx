import {React, useContext, useState} from 'react'
import {X,ShoppingCart,Menu} from 'react-feather'
import {All_Images,NavMenu} from '../../public/index.js'
import { AppContext } from './AppContext.jsx';
const Header = () => {
  const {ToggleMobileView,activeMenu, setactiveMenu,setveiwcart,ToggleOverflow,cartItems} = useContext(AppContext)
  return (
    <>

    <div className='  justify-between lg:px-5 p-2 top-0 fixed w-full z-10 lg:flex flex-col  backdrop-blur-3xl md:backdrop-blur-lg'>
      <div className="container:lg flex flex-col">
        <div className="upper flex justify-between mb-0 pb-0 ">
  
  <img src={All_Images.min_logo} className='cursor-pointer max-w-80 lg:max-w-96 max-h-20 lg:max-h-28'/>

        {/* <Search /> */}
        <div className="flex gap-5 md:gap-5 px-4">
        <ul className="hidden md:flex gap-8 justify-between ">
  {NavMenu.map((each,index) => <a href ={`${each.Link}`} key = {index} className= {activeMenu === each.Link ? 'text-3xl font-bold hover:text-white  cursor-pointer text-purple-600' : 'text-gray-400 text-3xl font-bold hover:text-white cursor-pointer'} onClick={() => setactiveMenu(index)}>{each.description}</a>)}
</ul>
          <div className="flex   text-white my-auto cursor-pointer relative ">
          <ShoppingCart size={30} className=' mb-0 hover:text-amber-500' onClick={() => {setveiwcart(true);ToggleOverflow()}}/>
          <div className="rounded-full  bg-orange-500 h-6 w-6 absolute top-0 end-0"><p className="text-[10px] font-black text-white text-center">{cartItems.length}</p></div>
          </div>
          <div onClick={() => {ToggleMobileView();}} className = 'flex lg:hidden hover:text-amber-500' ><Menu size={30} className='cursor-pointer ham-menu'/></div>
        </div>
      
        </div>
      </div>
    </div>




    </>
  )

}
export default Header