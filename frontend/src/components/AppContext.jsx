// IMPORTING REQUIRED MODULES
import  React, {createContext,useRef,useState ,useEffect, useCallback} from "react";
import { useLocation} from "react-router-dom";
import { Products } from "../../public";
// require('dotenv').config()
import axios from 'axios';


// CREATING A CONTEXT
export const AppContext = createContext();

// CONTEXT FUNCTION
const AppContextProvider = (props) => {
  const API_URL ='https://minifygadgets.vercel.app';
  const STANDARD_UGX_RATE = 3672

// ======START OF ALL CONSTANTS AND VARIABLES DECLARED======
const currentLocation = useLocation().pathname
// ======END OF ALL CONSTANTS AND VARIABLES DECLARED========
// ====== START OF ALL USESTATES=====
const [active_Brand, setactive_Brand] = useState(0)
const [active_Product, setactive_Product] = useState(0)
const [alerting,setalerting] = useState(false)
const [searchTerm, setsearchTerm] = useState("phones")
const [products, setproducts] = useState([])
const [categories, setcategories] = useState([])
const [addingitem, setaddingitem] = useState(false)
const [fullpageloading,setfullpageloading] = useState(false)
const [isLoading, setisLoading] = useState(false)
const [mobileMenuOpen, setmobileMenuOpen] = useState(false)
const [overflow_y, setoverflow_y] = useState(false)
const [activeMenu, setactiveMenu] = useState(currentLocation)
const [istoast, setistoast] = useState(false)
const [veiwcart, setveiwcart] = useState(false)
const [payment, setpayment] = useState(false) //form to fill to get the OTP Code
const [confirmpayment, setconfirmpayment] = useState(false) //form for confirming the code sent to the email
const [cartItems, setcartItems] = useState([])
 const [quantity, setQuantity] = useState({});
 const [messagesent, setmessagesent] = useState(false);
const [CustomerOrder, setCustomerOrder] = useState([])
const [customer_email, setcustomer_email] = useState('')
const [qttycheck, setqttycheck] = useState(false)
const [tblcheck, settblcheck] = useState(false)
const [ordernotsent,setordernotsent] = useState(false)
const [OTPexpired,setOTPexpired] = useState(false)
const [OTPIncorrect,setOTPIncorrect] = useState(false)
const [OTPcorrect,setOTPcorrect] = useState(false)
const [lastLocation, setLastLocation] = useState(null);
const prevLocationRef = useRef(currentLocation);
// ====== END OF ALL USESTATES=====


class RequestQueue {
  constructor() {
      this.queue = [];
      this.isProcessing = false;
  }

  add(request) {
      this.queue.push(request);
      this.processQueue();
  }

  async processQueue() {
      if (this.isProcessing || this.queue.length === 0) {
          return;
      }

      this.isProcessing = true;

      while (this.queue.length > 0) {
          const request = this.queue.shift();
          await request(); // Wait for the promise to resolve
      }

      this.isProcessing = false;
  }
}

// ====== START OF ALL FUNCTIONS=====



useEffect(() => {
    // Update last location state on location change
    setLastLocation(prevLocationRef.current);
    // Update ref with the current location
    prevLocationRef.current = currentLocation;
}, [currentLocation]);

    // Effect to apply/remove overflow class based on the state
    useEffect(() => {
      const body = document.querySelector('.html');
      if (overflow_y) {
          body.classList.add('overflow-y-hidden');
      } else {
          body.classList.remove('overflow-y-hidden');
      }
  }, [overflow_y]); // Re-run on overflow_y state change

  const ToggleOverflow = () => {
      setoverflow_y(prev => !prev);
  };

  const ToggleMobileView = () => {
    setmobileMenuOpen(prev => !prev);
    ToggleOverflow(); // Call toggleOverflow when toggling mobile menu
};

const increaseqtty = (id)=> {
  const item = cartItems.find(element => element.id === id);
  item.qtty += 1;
}

const decreaseqtty = (id)=> {
  const item = cartItems.find(element => element.id === id);
  if(item.qtty > 1) item.qtty -= 1;
}

const AddItems = (name, id, price) => {
  setaddingitem(true); // Set loading state

  const item = {
      id: id,
      name: name, 
      price: price, 
  };

  // Check if the item already exists in the cart
  if (cartItems.find(obj => obj.id === item.id)) {
      setalerting(true); // Set alert if item exists
  } else {
      // Add new item to cart
      setcartItems(prevItems => [...prevItems, item]); 
      setistoast(true); // Notify that item was added
  }

  setaddingitem(false); // Reset loading state
};

const RemoveItem = (id) => {
  // Use filter to remove item immutably
  setcartItems(prevItems => prevItems.filter(element => element.id !== id));
};

const SubmittingOrder = () => {
  if (cartItems.length > 0 ) {
      const oneOrder = []
      cartItems.forEach(element => {

        const item = {
              itemId: element.id,
              itemName: element.name,
              Quantity_Bought:quantity[element.id] ==='' ? 0 : Number(quantity[element.id]),
              Unit_Price: element.price,
              TotalAmount:quantity[element.id] * element.price
          }
        if (isNaN(item.Quantity_Bought)){
   setqttycheck(true);
        }else{
          oneOrder.push(item);
          window.location.href = '/submitorder'
          setCustomerOrder(oneOrder);}});return CustomerOrder;}else{settblcheck(true)}}

// ====== END OF ALL FUNCTIONS=====

// ALL CONTEXT VALUES

const AppContextValues = {STANDARD_UGX_RATE,API_URL,active_Brand,setactive_Brand,active_Product,setactive_Product,products,setmobileMenuOpen,mobileMenuOpen,ToggleMobileView,activeMenu,ToggleOverflow, setactiveMenu,isLoading,setisLoading,currentLocation,istoast, setistoast,veiwcart, setveiwcart,payment,setpayment,confirmpayment, setconfirmpayment,cartItems, setcartItems,AddItems,RemoveItem,decreaseqtty,increaseqtty,SubmittingOrder,quantity, setQuantity,CustomerOrder,setCustomerOrder,customer_email, setcustomer_email,searchTerm, setsearchTerm,alerting,setalerting,addingitem, setaddingitem,fullpageloading,setfullpageloading,messagesent, setmessagesent,qttycheck,setqttycheck,tblcheck,settblcheck,setordernotsent,ordernotsent,OTPcorrect,setOTPcorrect,OTPIncorrect,setOTPIncorrect,OTPexpired,setOTPexpired,lastLocation,RequestQueue}


// RETURNING AND EXPORTING THE REQUIRED MODULES
return (
    <AppContext.Provider value={AppContextValues}>
    {props.children}
    </AppContext.Provider>
    )}
export default AppContextProvider

