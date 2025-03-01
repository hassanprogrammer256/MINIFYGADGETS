import React from 'react'
import Home from '../pages/HomePage'
import Shop from '../pages/Shop'
import { Route, Routes } from 'react-router-dom'
import ViewProduct from '../pages/ViewProduct'
import PagenotFound from '../pages/PagenotFound'


const Pages = () => {
  return (
  <>

    <Routes>
    <Route path="/shop" element={<Shop />} />
    <Route path="/" element={  <Home />} />
    <Route path="/veiwproduct" element={  <ViewProduct />} />
    <Route path="*" element={  <PagenotFound />} />
    </Routes> 
  </>
 
  )
}

export default Pages
