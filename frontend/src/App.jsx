import React, { useContext } from 'react'
import Header from './components/Header'
import Pages from './components/Pages'
import MyFooter from './components/MyFooter'
import { Route, Routes } from 'react-router-dom'
import Shop from './pages/Shop'
import MySidebar from './components/MySidebar'
import MyToast from './components/MyToast'
import Veiwcart from './components/Veiwcart'
import Order from './components/order'
import Confirmorder from './components/confirmpayment'
import Note from './components/Alert'
import { AppContext } from './components/AppContext'




const App =() => {
  const {addingitem, setaddingitem,alerting,fullpageloading,ordernotsent, messagesent,qttycheck,tblcheck, setmessagesent,istoast,settblcheck,setistoast} = useContext(AppContext)
  return (
  <>
  <div className="bg-web">
  <Header/>
<Pages />
<MyFooter />
  </div>
<MySidebar /><MyToast
  message={
    istoast && (
      messagesent ? 'Message Sent Successfully' : 'Item Added Successfully'
    )
  }
  action={
    istoast && (
      messagesent ? '' : 'View Cart'
    )
  }
/><Veiwcart /><Order /><Confirmorder /><Note message={alerting ? 'Item already in Cart': qttycheck ? 'fill all the quantity fields':ordernotsent? 'Something Went Wrong': tblcheck ? 'No Item Added' : '' } />
  </>
  )
}

export default App
