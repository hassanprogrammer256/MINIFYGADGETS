import React, { useContext, useState, useEffect } from 'react';
import { AppContext } from './AppContext';
import { motion } from 'framer-motion';
import { X } from 'react-feather';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FaCashRegister } from 'react-icons/fa';



const Order = () => {

  const {
    setfullpageloading,
    setordernotsent,
    setcustomer_email,
    RequestQueue,
    API_URL,
    CustomerOrder,
    setCustomerOrder,
    setveiwcart,
    ToggleOverflow,
    payment,
    lastLocation,
    cartItems,
    setpayment,
    setconfirmpayment,
    settblcheck
  } = useContext(AppContext);
  const [inputValue, setInputValue] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(-1);
  const [locations, setLocations] = useState([]);
  const [isLoading, setisLoading] = useState(false);

const [name, setname] = useState('')
const [email, setemail] = useState('')
const [number, setnumber] = useState('')


  const orderQueue = new RequestQueue();

  const fetchLocations = async (query) => {
    try {
      const response = await fetch(`https://nominatim.openstreetmap.org/search?country=uganda&city=${query}&format=json`);
      const data = await response.json();
      const locationNames = data.map(location => location.display_name);
      setLocations(locationNames);
      
    } catch (error) {
      console.error("Error fetching locations:", error);
    }
  };

  useEffect(() => {
    if (inputValue.length > 0) {
      const timerId = setTimeout(() => {
        fetchLocations(inputValue);
      }, 100);
      
      return () => clearTimeout(timerId);
    } else {
      setSuggestions([]);
    }
  }, [inputValue]);

  useEffect(() => {
    if (inputValue) {
      const filteredSuggestions = locations.filter(location =>
        location.toLowerCase().startsWith(inputValue.toLowerCase())
      );
      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]);
    }
  }, [locations, inputValue]);

  const handleChange = (e) => {
    setInputValue(e.target.value);
    setActiveSuggestionIndex(-1);
  };

  const handleSuggestionClick = (suggestion) => {
    setInputValue(suggestion);
    setSuggestions([]);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      setActiveSuggestionIndex((prevIndex) =>
        (prevIndex < suggestions.length - 1 ? prevIndex + 1 : prevIndex)
      );
    } else if (e.key === 'ArrowUp') {
      setActiveSuggestionIndex((prevIndex) =>
        (prevIndex > 0 ? prevIndex - 1 : prevIndex)
      );
    } else if (e.key === 'Enter') {
      if (activeSuggestionIndex >= 0) {
        handleSuggestionClick(suggestions[activeSuggestionIndex]);
      }
    }
  };

  const HandleSubmit = async (event) => {
    event.preventDefault();
let customerorder = sessionStorage.getItem('customerOrder')
let paymentmethod = document.getElementById('payment-method').value;
    if (name && email && location && paymentmethod && number,customerorder) {
      const request = async() => {
        setisLoading(true);
        try {
          let customerLocation= inputValue
          const res = await axios.post(`${API_URL}/submitorder`, { name, number, email, customerLocation, paymentmethod, customerorder });
          console.log(res.data)
          if (res.data.message === "OTP SENT") {
            sessionStorage.setItem('customerEmail',email)
           window.location.href = '/confirmcode'
          } else {
            settblcheck(false);
            setordernotsent(true);
          }
        } catch (err) {
          setordernotsent(true);
        } finally {
          setisLoading(false);
        } 
      };orderQueue.add(request);
    }
  };

  return (
    <motion.div 
      initial={{ y: -500, opacity: 0, visibility: 'hidden' }}
      animate={{ y: 0, opacity: 1, visibility: 'visible' }}
      exit={{ opacity: 0 }}
      className='fixed top-0 w-full h-full end-0 bg-modal z-10 overflow-y-scroll'>
      
      <div className="flex justify-center py-4">
        <div className="flex flex-col justify-center bg-gray-900 md:w-[70%] pt-40 pb-5 px-2 relative">
          <div className="flex justify-between mx-6">
            <h1 className="text-white text-center font-bold text-5xl mb-4">MINIFY GADGETS</h1>
            <Link to={'/'}>
              <X size={30} className='hover:text-white cursor-pointer' onClick={() => { ToggleOverflow(); }} />
            </Link>
          </div>

          {isLoading && (
            <div className="flex justify-center items-center fixed inset-0 bg-gray-800 opacity-75 z-50">
              <div className="animate-spin rounded-full h-32 w-32 border-8 border-t-8 border-green-500 border-t-transparent"></div>
              <div className="flex justify-center my-20">
                <h1 className="font-black text-gray-200 text-4xl">PLEASE WAIT.....</h1>
              </div>
            </div>
          )}

          <form 
            className="rnt-contact-form rwt-dynamic-form row md:px-4 px-2" 
            id="contact-form" 
            method='POST' 
            autoComplete="on"
            onSubmit={HandleSubmit}
            style={{ pointerEvents: isLoading ? 'none' : 'auto' }} // Disable interaction
          >
            <div className="col-lg-6">
              <div className="form-group">
                <label htmlFor="contact-name">Full Name</label>
                <input 
                value={name}
                onChange={(e) => {setname(e.target.value);setordernotsent(false)}}
                  className="form-control form-control-sm" 
                  name="name" 
                  id="name" 
                  type="text" 
                  required 
                  disabled={isLoading} // Disable input during loading
                />
              </div>
            </div>

            <div className="col-lg-6">
              <div className="form-group">
                <label htmlFor="contact-phone">Phone Number</label>
                <input 
                value={number}
                onChange={(e) => {setnumber((e.target.value.split('+').length - 1) > 1 ? e.target.value.replace(/\+/g, '') : e.target.value.replace(/[^0-9+]/g, ''));setordernotsent(false)}}
                  className="form-control" 
                  name="phone" 
                  id="phone" 
                  type="text" 
                  maxLength={15}
                  required 
                  disabled={isLoading} // Disable input during loading
                />
              </div>
            </div>

            <div className="col-lg-12">
              <div className="form-group">
                <label htmlFor="contact-email">Email</label>
                <input 
                value={email}
                onChange={(e) => {setemail(e.target.value);setordernotsent(false)}}
                  className="form-control form-control-sm" 
                  id="email" 
                  name="email" 
                  type="email" 
                  required 
                  disabled={isLoading} // Disable input during loading
                />
              </div>
            </div>

            <div className="col-lg-12">
              <div className="form-group">
                <label htmlFor="location">Location</label>
                <input 
                  className="form-control form-control-sm" 
                  id="location" 
                  name="location" 
                  type="text" 
                  value={inputValue} 
                  onChange={handleChange} 
                  onKeyDown={handleKeyDown} 
                  required 
                  disabled={isLoading} // Disable input during loading
                />
                {suggestions.length > 0 && (
                  <ul className="suggestions-list list-none">
                    {suggestions.map((suggestion, index) => (
                      <li
                        key={suggestion}
                        onClick={() => handleSuggestionClick(suggestion)}
                        className={index === activeSuggestionIndex ? 'cursor-pointer bg-gray-300 text-gray-800 hover:bg-blue-800' : 'cursor-pointer hover:bg-blue-800'}
                      >
                        {suggestion}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>

            <div className="col-lg-12">
              <div className="form-group">
                <label htmlFor="contact-method">Payment Method</label>
                <div className="mb-3">
                  <select 
                    className="form-select form-select-lg" 
                    name="payment-method" 
                    id="payment-method" 
                    
                    disabled={isLoading} // Disable input during loading
                  >
                    <option>CASH ON DELIVERY</option>
                    <option>AIRTEL OR MOBILE MONEY</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="flex justify-around gap-4">
              <Link to={'/veiwcart'}>
                <button 
                  className='bg-red-900 hover:bg-red-500 cursor-pointer text-center font-black text-white rounded-2xl' 
                  disabled={isLoading} // Disable button during loading
                >
                  DISCARD
                </button>
              </Link>
              <button 
                type="submit" 
                className='bg-green-900 hover:bg-green-500 cursor-pointer text-center font-black text-white rounded-2xl' 
                disabled={isLoading} // Disable button during loading
              >
                SUBMIT
              </button>
            </div>
          </form>
        </div>
      </div>
    </motion.div>
  );
}

export default Order;