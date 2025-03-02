import React, { useContext, useState, useEffect } from 'react';
import { AppContext } from './AppContext';
import { motion } from 'framer-motion';
import { X } from 'react-feather';
import axios from 'axios';
import Loading from './Loading';
import Preloader from './Preloader';

const Order = () => {
  const {
    customer_email,
    setcustomer_email,
    API_URL,
    CustomerOrder,
    setCustomerOrder,
    setveiwcart,
    ToggleOverflow,
    payment,
    setpayment,
    setconfirmpayment,
    isLoading,
    setisLoading,
  } = useContext(AppContext);

  const [inputValue, setInputValue] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(-1);
  const [locations, setLocations] = useState([]); // Store fetched locations

  const fetchLocations = async (query) => {
    try {
      const response = await fetch(`https://nominatim.openstreetmap.org/search?country=uganda&city=${query}&format=json`);
      const data = await response.json();
      const locationNames = data.map(location => location.display_name); // Change this based on how you want to display the locations
      setLocations(locationNames);
    } catch (error) {
      console.error("Error fetching locations:", error);
    }
  };

  useEffect(() => {
    if (inputValue.length > 0) {
      const timerId = setTimeout(() => {
        fetchLocations(inputValue); // Fetch locations based on user input
      }, 100); // Adding debounce effect to API calls
      
      return () => clearTimeout(timerId); // Cleanup function to avoid multiple API calls
    } else {
      setSuggestions([]); // Clear suggestions when input is empty
    }
  }, [inputValue]);

  useEffect(() => {
    // Filter suggestions based on fetched locations
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
    setActiveSuggestionIndex(-1); // Reset active suggestion index
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

    const name = document.getElementById('name').value;
    const number = document.getElementById('phone').value;
    const email = document.getElementById('email').value;
    const location = document.getElementById('location').value;
    const paymentMethod = document.getElementById('payment-method').value;

    if (name && email && location && paymentMethod && number) {
      try {
        setisLoading(true);
        const res = await axios.post(`${API_URL}/submitorder`, { name, number, email, location, paymentMethod, CustomerOrder });
        console.log(res);
        if (res.message === 'sent') {
          alert('Order placed successfully');
          setcustomer_email(email);
          setCustomerOrder([]);
          setveiwcart(false);
          ToggleOverflow();
          setconfirmpayment(true);
        }} catch (err) {console.error('some thing went wrong');
      } finally {
        setisLoading(false);
      }
    } 
  };

  return (
    isLoading ? <Preloader /> : <motion.div 
      initial={{ y: 500, opacity: 0, visibility: 'hidden' }}
      animate={{ y: payment ? 0 : -500, opacity: payment ? 1 : 0, visibility: payment ? 'visible' : 'hidden' }}
      transition={{ type: 'tween', duration: .5 }}
      className='fixed top-0 w-full h-full end-0 bg-modal z-30 bg-red-800 overflow-y-scroll'>
      
      <div className="flex justify-center py-4">
        <div className="flex flex-col justify-center bg-gray-900 md:w-[70%] pt-40 pb-5 px-2">
          <div className="flex justify-between mx-6">
            <h1 className="text-white text-center font-bold text-5xl mb-4">MINIFY GADGETS</h1>
            <X size={30} className='hover:text-white cursor-pointer' onClick={() => { setpayment(false); ToggleOverflow(); }} />
          </div>
          <form className="rnt-contact-form rwt-dynamic-form row md:px-4 px-2" id="contact-form" method='POST' onSubmit={HandleSubmit}>

            <div className="col-lg-6">
              <div className="form-group">
                <label htmlFor="contact-name">Full Name</label>
                <input className="form-control form-control-sm" name="name" id="name" type="text" required />
              </div>
            </div>

            <div className="col-lg-6">
              <div className="form-group">
                <label htmlFor="contact-phone">Phone Number</label>
                <input className="form-control" name="phone" id="phone" type="text" required />
              </div>
            </div>

            <div className="col-lg-12">
              <div className="form-group">
                <label htmlFor="contact-email">Email</label>
                <input className="form-control form-control-sm" id="email" name="email" type="email" required />
              </div>
            </div>

            <div className="col-lg-12">
              <div className="form-group">
                <label htmlFor="location">Location</label>
                <input className="form-control form-control-sm" id="location" 
                       name="location" type="text" 
                       value={inputValue} 
                       onChange={handleChange} 
                       onKeyDown={handleKeyDown} 
                       required />
                {suggestions.length > 0 && (
                  <ul className="suggestions-list list-none">
                    {suggestions.map((suggestion, index) => (
                      <li
                        key={suggestion}
                        onClick={() => handleSuggestionClick(suggestion)}
                        className={index === activeSuggestionIndex ? 'cursor-pointer bg-gray-300 text-gray-800 hover:bg-blue-800' : ' cursor-pointer hover:bg-blue-800'}
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
                <label htmlFor="contact-message">Payment Method</label>
                <div className="mb-3">
                  <select className="form-select form-select-lg" name="payment-method" id="payment-method">
                    <option>CASH ON DELIVERY</option>
                    <option>AIRTEL OR MOBILE MONEY</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="flex justify-around gap-4">
              <button type="button" className='bg-red-900 hover:bg-red-500 cursor-pointer text-center font-black text-white rounded-2xl' 
                      onClick={() => { setpayment(false); ToggleOverflow(); }}>DISCARD</button>
              <button type="submit" className='bg-green-900 hover:bg-green-500 cursor-pointer text-center font-black text-white rounded-2xl'>SUBMIT</button>
            </div>
          </form>
        </div>
      </div>
    </motion.div>
  );
}

export default Order;