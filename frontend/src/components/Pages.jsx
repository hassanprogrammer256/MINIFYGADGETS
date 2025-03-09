import React from 'react'
import Home from '../pages/HomePage'
import Shop from '../pages/Shop'
import { Outlet, Route, Routes } from 'react-router-dom'
import ViewProduct from '../pages/ViewProduct'
import PagenotFound from '../pages/PagenotFound'
import Order from './order'
import Veiwcart from './Veiwcart'
import Confirmorder from './confirmpayment'


const Pages = () => {
  return (
  <>

    <Routes>
    <Route path="/shop" element={<Shop />} />
    <Route path="/" element={  <Home />} />
    <Route path="/veiwproduct/:id" element={  <ViewProduct />} />
    <Route path="*" element={  <PagenotFound />} />
    <Route path="/veiwcart" element={<Veiwcart />} />
    <Route path="/submitorder" element={<Order />} />
    <Route path="/confirmcode" element={<Confirmorder />} />
    </Routes> 
  </>
 
  )
}

export default Pages
