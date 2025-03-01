import React from 'react'
import Header from './components/Header'
import Pages from './components/Pages'
import MyFooter from './components/MyFooter'
import { Route, Routes } from 'react-router-dom'
import Shop from './pages/Shop'
import MySidebar from './components/MySidebar'
import MyToast from './components/MyToast'
import Veiwcart from './components/Veiwcart'
import Order from './components/order'
import Confirmorder from './components/confirmPayment'


const App =() => {
  return (
  <>
  <div className="bg-web">
  <Header/>
<Pages />
<MyFooter />
  </div>
<MySidebar /><MyToast /> <Veiwcart /><Order /><Confirmorder />

  </>
  )
}

export default App
