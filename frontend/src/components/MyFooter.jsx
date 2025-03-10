import React, { useContext, useState } from 'react'
import {Footer, Pagination} from 'flowbite-react'
import { All_Images, NavLinks, pageTransition } from '../../public/index.js'
import { AppContext } from './AppContext.jsx'
import Review_group from './Review_group.jsx'
import axios from 'axios'
import { motion } from "framer-motion";

const MyFooter = () => {
  const {API_URL,activemenu, setactivemenu,messagesent, setmessagesent,setistoast,setordernotsent} = useContext(AppContext)
  const [name, setname] = useState('')
  const [phonenumber, setphonenumber] = useState('')
  const [email, setemail] = useState('')
  const [subject, setsubject] = useState('')
  const [message, setmessage] = useState('')
  const [sendingMessage, setsendingMessage] = useState(false)

  const HandleSubmit = async(event) => {
event.preventDefault();
const name  = document.getElementById('contact-fullnames').value;
const phonenumber  = document.getElementById('contact-phone').value;
const email  = document.getElementById('contact-email').value;
const subject  = document.getElementById('subject').value;
const message  = document.getElementById('contact-message').value;


if (name && phonenumber && subject && email && message) {
  try {
    setsendingMessage(true)
    const res = await axios.post(`${API_URL}/sendfeedback`, {name, phonenumber, email, message, subject});
    if (res.status === 200) {
setistoast(true)
setphonenumber('')
setname('')
setemail('')
setsubject('')
setmessage('')

}
else{
  setordernotsent(true)
      }
    } catch (err) {console.error(err);
  }finally {
    setsendingMessage(false);
  }
} 
};
  
  return (
  <>
<Review_group />

  {/* =========CONTACT ME===================== */}
  <motion.div 
  variants={pageTransition}
  initial = {{opacity:0}}
  whileInView={{opacity:1}}
  transition={{type:'tween',duration:1}}
  className="bg-slate-950 text-white" id="contacts">
<div className="section-title text-center my-5">
<h2 className="title">Contact  Us On: </h2>
</div>
<div className="md:grid grid-cols-[40%_60%]">
<div className="row mt--50 mt_md--40 mt_sm--40 mt-contact-sm">
<div className="contact-about-area">
<div className="thumbnail">
<img src={All_Images.contacts} alt="contact-img" />
</div>
<div className="title-area">
<h4 className="title">MINIFY||GADGETS</h4>
<span className='text-amber-300 font-emphasis text-3xl'>Discover Gadgets That Speaks to Your Soul</span>
</div>
<div className="description">
<p> We prioritize quality by offering curated services from talented personnels. Each product is accompanied by detailed descriptions, dimensions, and authenticity assurances, ensuring you are well-informed about your potential investment.
</p>
<span className="phone 'text-amber-300 font-emphasis text-3xl text-amber-300 my-3">Phone: <a href="#">+256 755062613</a></span>
<span className="mail 'text-amber-300 font-emphasis text-3xl text-amber-300 my-3">Email: <a href="mailto:laubenwalukagga256@gmail.com">laubenwalukagga256@gmail.com</a></span>
</div>

</div>
</div>


<div data-aos-delay="600" className="col-lg-7 contact-input">
<div className="contact-form-wrapper">
<form className="rnt-contact-form rwt-dynamic-form row " id="contacts" onSubmit={HandleSubmit}>

<div className="col-lg-6">
<div className="form-group">
<label htmlFor="contact-name">Your Name</label>
<input className="form-control form-control-lg" name="contact-name" id="contact-fullnames" type="text" required value={name} onChange={(e) => { 
  if (/^[A-Za-z\s!@#$%^&*()_+={}\[\]:;"'<>,.?/\\|-]*$/.test(e.target.value)) {
            setname(e.target.value); 
        }else{null} }} />
</div>
</div>

<div className="col-lg-6">
<div className="form-group">
<label htmlFor="contact-phone">Phone Number</label>
<input className="form-control" name="contact-phone" id="contact-phone" type="text" required value={phonenumber} onChange={(e) => setphonenumber(e.target.value)} />
</div>
</div>

<div className="col-lg-12">
<div className="form-group">
<label htmlFor="contact-email">Email</label>
<input className="form-control form-control-sm" id="contact-email" name="contact-email" type="email" required value={email} onChange={(e) => setemail(e.target.value)} />
</div>
</div>

<div className="col-lg-12">
<div className="form-group">
<label htmlFor="subject">subject</label>
<input className="form-control form-control-sm" id="subject" name="subject" type="text"  required value={subject} onChange={(e) => setsubject(e.target.value)} />
</div>
</div>

<div className="col-lg-12">
<div className="form-group">
<label htmlFor="contact-message">Your Message</label>
<textarea name="contact-message" id="contact-message" cols="30" rows="10" required value={message} onChange={(e) => setmessage(e.target.value)} ></textarea>
</div>
</div>

<div className="col-lg-12">
<button name="submit" type="submit" id="submit" className={sendingMessage ? "rn-btn btn-diabled" :"rn-btn"}>
{sendingMessage ? <span className="border-spinner-lg">Sending....</span> : <span>SEND MESSAGE</span>}
</button>
</div>
</form>
</div>
</div>


</div>





</motion.div>

 {/* ================FOOTER================= */}
   <Footer className='bg-slate-950 rounded pt-3'>
<div className = 'w-full px-4 lg:px-24'>
<div className = 'w-full grid grid-cols-2 gap-8 px-3 py-8 md:grid-cols-3 font-emphasis font-bold text-[20px] text-slate-400'>
  {/* ..menu..... */}
<div>
  <Footer.Title title='MENU' className='text-4xl text-amber-400'/>
<Footer.LinkGroup col className='gap-3'>
{NavLinks.map((each,index) => (<Footer.Link href={`/${each}`} key={index} className = {activemenu === index ? " hover:underline text-amber-300 underline" : "hover:underline  hover:text-amber-300 no-underline"} >
{each}
  </Footer.Link>))}

</Footer.LinkGroup>
</div>

{/* ...help desk.. */}
<div>
  <Footer.Title title='CONTACT US'  className='text-4xl text-amber-400'/>
<Footer.LinkGroup col className='gap-3'>
  <Footer.Link href='/'>
Facebook
  </Footer.Link>

  <Footer.Link href='/'>
Instagram
  </Footer.Link>

  <Footer.Link href='/'>
Whatsapp
  </Footer.Link>

  <Footer.Link href='/'>
Email
  </Footer.Link>

  <Footer.Link href='/'>
Twitter
  </Footer.Link>

  <Footer.Link href='/'>
Call Us
  </Footer.Link>
</Footer.LinkGroup>
</div>

{/* ...legal.. */}
<div>
  <Footer.Title title='LEGAL'  className='text-4xl text-amber-400'/>
<Footer.LinkGroup col className='gap-3'>
  <Footer.Link href=''>
Privacy Policy
  </Footer.Link>

  <Footer.Link href=''>
Terms and Conditions
  </Footer.Link>

  <Footer.Link href=''>
Licences
  </Footer.Link>


</Footer.LinkGroup>
</div>
  
</div>
{/* copyright and icons */}
<div className="w-full rounded bg-gray-700 px-4 py-6 flex-col justify-between flex sm:flex-row ">
<Footer.Copyright by=' MINIFY||GADGETS' href= '/' year={2024} className='text-[23px]'/>
<div className="mt-4 flex space-x-6 sm:mt-0 sm:justify-between ">
 <div className="flex gap-5 ">

{/* mail */}
<a href="mailto:laubenwalukagga256@gmail.com"><svg xmlns="http://www.w3.org/2000/svg" width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-mail"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg></a>
 {/* telephone  */}
 <a href="#">
 <svg xmlns="http://www.w3.org/2000/svg" width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-phone"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
 </a>
 </div>
</div>
</div>
</div>


   </Footer>
   </>
  )
}

export default MyFooter