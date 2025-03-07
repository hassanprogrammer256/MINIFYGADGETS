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
import OtpCorrect from './components/Otp'




const App =() => {
  const {addingitem, setaddingitem,alerting,fullpageloading,ordernotsent, messagesent,qttycheck,tblcheck, setmessagesent,istoast,settblcheck,setistoast,OTPcorrect,setOTPcorrect,OTPIncorrect,setOTPIncorrect,OTPexpired,setOTPexpired} = useContext(AppContext)
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
      messagesent ? 'Message Sent Successfully' : 'Operation Succesfull'
    )
  }
  action={
    istoast && (
      messagesent ? '' : 'View Cart'
    )
  }
/><Veiwcart /><Order /><Confirmorder /><Note message={alerting ? 'Item already in Cart': qttycheck ? 'fill all the quantity fields':ordernotsent ? 'Something Went Wrong': tblcheck ? 'No Item Added' : OTPIncorrect ? 'Incorect code': OTPexpired ?  'Code Expired' : '' } />
<OtpCorrect />
  </>
  )
}

export default App
