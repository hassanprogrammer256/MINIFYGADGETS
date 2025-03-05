import React, { useContext, useState } from 'react'
import {Footer} from 'flowbite-react'
import { All_Images, NavLinks } from '../../public/index.js'
import { AppContext } from './AppContext.jsx'
import Review_group from './Review_group.jsx'
import axios from 'axios'

const MyFooter = () => {
  const {API_URL, activemenu, setactivemenu, setistoast} = useContext(AppContext)
  const [sendingMessage, setsendingMessage] = useState(false)
  
  const HandleSubmit = async(event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const {name, phonenumber, email, subject, message} = Object.fromEntries(formData);

    if (name && phonenumber && subject && email && message) {
      try {
        setsendingMessage(true)
        const res = await axios.post(`${API_URL}/sendfeedback`, {name, phonenumber, email, message, subject});
        if (res.status === 200) setistoast(true)
      } catch (err) {
        console.error(err);
      } finally {
        setsendingMessage(false);
      }
    } 
  };

  return (
    <>
      <Review_group />

      {/* Contact Section */}
      <div className="bg-slate-950 text-white" id="contacts">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold">Contact Us On:</h2>
          </div>
          
          <div className="row">
            <div className="col-md-5 mb-8">
              <div className="contact-about-area">
                <img src={All_Images.contacts} alt="contact-img" className="img-fluid mb-4" />
                <h4 className="text-2xl font-bold mb-2">MINIFY||GADGETS</h4>
                <p className="text-amber-300 text-lg mb-4">Discover Gadgets That Speak to Your Soul</p>
                <p className="mb-4">
                  We prioritize quality by offering curated services from talented personnel. 
                  Each product comes with detailed descriptions and authenticity assurances.
                </p>
                <div className="contact-info">
                  <p className="text-amber-300 mb-2">Phone: +256 755062613</p>
                  <p className="text-amber-300">Email: laubenwalukagga256@gmail.com</p>
                </div>
              </div>
            </div>

            <div className="col-md-7">
              <form onSubmit={HandleSubmit} className="contact-form">
                <div className="row">
                  <div className="col-md-6 mb-4">
                    <label htmlFor="contact-name" className="form-label">Your Name</label>
                    <input type="text" className="form-control" id="contact-name" name="name" required />
                  </div>
                  
                  <div className="col-md-6 mb-4">
                    <label htmlFor="contact-phone" className="form-label">Phone Number</label>
                    <input type="tel" className="form-control" id="contact-phone" name="phonenumber" required />
                  </div>
                </div>

                <div className="mb-4">
                  <label htmlFor="contact-email" className="form-label">Email</label>
                  <input type="email" className="form-control" id="contact-email" name="email" required />
                </div>

                <div className="mb-4">
                  <label htmlFor="subject" className="form-label">Subject</label>
                  <input type="text" className="form-control" id="subject" name="subject" required />
                </div>

                <div className="mb-4">
                  <label htmlFor="message" className="form-label">Your Message</label>
                  <textarea className="form-control" id="message" name="message" rows="4" required></textarea>
                </div>

                <button 
                  type="submit" 
                  className="btn btn-primary w-100"
                  disabled={sendingMessage}
                >
                  {sendingMessage ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Section */}
      <Footer className="bg-slate-950">
        <div className="container mx-auto px-4">
          <div className="row">
            <div className="col-md-4 mb-6">
              <Footer.Title title="MENU" className="text-amber-400" />
              <Footer.LinkGroup col>
                {NavLinks.map((link, index) => (
                  <Footer.Link 
                    key={index}
                    href={`/#${link}`}
                    className={activemenu === index ? "text-amber-300" : ""}
                  >
                    {link}
                  </Footer.Link>
                ))}
              </Footer.LinkGroup>
            </div>

            <div className="col-md-4 mb-6">
              <Footer.Title title="CONTACT" className="text-amber-400" />
              <Footer.LinkGroup col>
                {['Facebook', 'Instagram', 'WhatsApp', 'Email', 'Twitter', 'Call Us'].map((method, i) => (
                  <Footer.Link key={i} href="#">{method}</Footer.Link>
                ))}
              </Footer.LinkGroup>
            </div>

            <div className="col-md-4 mb-6">
              <Footer.Title title="LEGAL" className="text-amber-400" />
              <Footer.LinkGroup col>
                {['Privacy Policy', 'Terms & Conditions', 'Licenses'].map((item, i) => (
                  <Footer.Link key={i} href="#">{item}</Footer.Link>
                ))}
              </Footer.LinkGroup>
            </div>
          </div>

          <div className="footer-bottom text-center py-4 border-t border-gray-700">
            <Footer.Copyright 
              href="/" 
              by="MINIFY||GADGETS" 
              year={2024}
              className="text-white"
            />
            <div className="social-icons mt-3">
              {/* Social media icons here */}
            </div>
          </div>
        </div>
      </Footer>
    </>
  )
}

export default MyFooter