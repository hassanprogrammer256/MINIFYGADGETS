// IMPORTING REQUIRED MODULES
import  React, {createContext,useRef,useState ,useEffect, useCallback} from "react";
import { useLocation} from "react-router-dom";
import { Products } from "../../public";
import axios from 'axios';

// CREATING A CONTEXT
export const AppContext = createContext();

// CONTEXT FUNCTION
const AppContextProvider = (props) => {
  const API_URL = 'https://minifygadgets.vercel.app'
  // const API_URL = 'http://localhost:3000'
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
const [overflow_y, setoverflow_y] = useState(true)
const [activeMenu, setactiveMenu] = useState(currentLocation)
const [istoast, setistoast] = useState(false)
const [veiwcart, setveiwcart] = useState(false)
const [payment, setpayment] = useState(false)
const [confirmpayment, setconfirmpayment] = useState(false)
const [cartItems, setcartItems] = useState([])
 const [quantity, setQuantity] = useState({});
 const [messagesent, setmessagesent] = useState(false);
 const [emailVerified, setemailVerified] = useState(false);
const [CustomerOrder, setCustomerOrder] = useState([])
const [customer_email, setcustomer_email] = useState('')
const [qttycheck, setqttycheck] = useState(false)
const [tblcheck, settblcheck] = useState(false)
const [ordernotsent,setordernotsent] = useState(false)
const [OTPexpired,setOTPexpired] = useState(false)
const [OTPIncorrect,setOTPIncorrect] = useState(false)
const [OTPcorrect,setOTPcorrect] = useState(false)
// ====== END OF ALL USESTATES=====



// ====== START OF ALL FUNCTIONS=====
const ToggleOverflow = () => {
  const Body = document.querySelector('.html')
  setoverflow_y(!overflow_y)
  if (overflow_y){
    Body.classList.add('overflow-hidden')
    } else {
    Body.classList.remove('overflow-hidden')
  
  }}

const ToggleMobileView = () => {
  setmobileMenuOpen(!mobileMenuOpen);
  ToggleOverflow();
}
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
          setveiwcart(false);
          setpayment(true);
          setCustomerOrder(oneOrder);}});return CustomerOrder;}else{settblcheck(true)}}

// ====== END OF ALL FUNCTIONS=====

// ALL CONTEXT VALUES

const AppContextValues = {STANDARD_UGX_RATE,API_URL,active_Brand,setactive_Brand,active_Product,setactive_Product,products,setmobileMenuOpen,mobileMenuOpen,ToggleMobileView,activeMenu,ToggleOverflow, setactiveMenu,isLoading,setisLoading,currentLocation,istoast, setistoast,veiwcart, setveiwcart,payment,setpayment,confirmpayment, setconfirmpayment,cartItems, setcartItems,AddItems,RemoveItem,decreaseqtty,increaseqtty,SubmittingOrder,quantity, setQuantity,CustomerOrder,setCustomerOrder,customer_email, setcustomer_email,searchTerm, setsearchTerm,alerting,setalerting,addingitem, setaddingitem,fullpageloading,setfullpageloading,messagesent, setmessagesent,emailVerified, setemailVerified,qttycheck,setqttycheck,tblcheck,settblcheck,setordernotsent,ordernotsent,OTPcorrect,setOTPcorrect,OTPIncorrect,setOTPIncorrect,OTPexpired,setOTPexpired}


// RETURNING AND EXPORTING THE REQUIRED MODULES
return (
    <AppContext.Provider value={AppContextValues}>
    {props.children}
    </AppContext.Provider>
    )}
export default AppContextProvider

