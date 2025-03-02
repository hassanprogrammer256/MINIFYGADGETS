// IMPORTING REQUIRED MODULES
import  React, {createContext,useRef,useState ,useEffect, useCallback} from "react";
import { useLocation} from "react-router-dom";
import { Products } from "../assets";

// CREATING A CONTEXT
export const AppContext = createContext();

// CONTEXT FUNCTION
const AppContextProvider = (props) => {
// const API_URL = 

// ======START OF ALL CONSTANTS AND VARIABLES DECLARED======
const currentLocation = useLocation().pathname
// ======END OF ALL CONSTANTS AND VARIABLES DECLARED========
// ====== START OF ALL USESTATES=====
const [active_Brand, setactive_Brand] = useState(0)
const [active_Product, setactive_Product] = useState(0)

const [searchTerm, setSearchTerm] = useState("phones")
const [products, setproducts] = useState([])
const [categories, setcategories] = useState([])
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
const [CustomerOrder, setCustomerOrder] = useState([])
const [customer_email, setcustomer_email] = useState('')
// ====== END OF ALL USESTATES=====
// const API_URL = 'https://minifygadgets.onrender.com'
const API_URL = 'https://minifygadgets.vercel.app/'
// LOCATION_API_ID = 'H8SA7Oy1hcO7Jv3RbcjA'
// LOCATION_API_KEY = 'fn5NwK13TLc3vnPLt47c2Y9U2TvysfiZecNxJy8CQpA'
const getData = useCallback(() => {
  setisLoading(true);
  fetch(`${API_URL}/getdummy`)
    .then(response => response.json())
    .then(responseData => {
      // const sliced = responseData.slice(0, 10);
      setproducts(responseData);
      
      setisLoading(false); // Update loading state
    })
    .catch(err => {
      console.error(err); // Log any error that occurs during fetching
      setisLoading(false); // It's good practice to stop loading on error
    });
}, []);

useEffect(() => {
  getData();
}, [getData]);

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

    const item = {
      id:id,
      name: name, 
      price: price,
  };
if (cartItems.find(obj => obj.id === item.id)) {
  alert('Item already in cart');}else{
  setcartItems(prevItems => [...prevItems, item]);
  setistoast(true);
  
}
  

  
};

const RemoveItem = (id) => {
  // Use filter to remove item immutably
  setcartItems(prevItems => prevItems.filter(element => element.id !== id));
};

const SubmittingOrder = () => {
  if (cartItems.length > 0) {
      const oneOrder = []
      cartItems.forEach(element => {
        const item = {
              itemId: element.id,
              itemName: element.name,
              Quantity_Bought:quantity[element.id] ==='' ? 0 : Number(quantity[element.id]),
              Unit_Price: element.price,
              TotalAmount:quantity[element.id] * element.price
          }
          oneOrder.push(item)
          setveiwcart(false)
          setpayment(true);
          setCustomerOrder(oneOrder)
      });
  return CustomerOrder;
  }else{alert('No Items Selected')}
      
  }

// ====== END OF ALL FUNCTIONS=====

// ALL CONTEXT VALUES

const AppContextValues = {getData,API_URL,active_Brand,setactive_Brand,active_Product,setactive_Product,products,setmobileMenuOpen,mobileMenuOpen,ToggleMobileView,activeMenu,ToggleOverflow, setactiveMenu,isLoading,setisLoading,currentLocation,istoast, setistoast,veiwcart, setveiwcart,payment,setpayment,confirmpayment, setconfirmpayment,cartItems, setcartItems,AddItems,RemoveItem,decreaseqtty,increaseqtty,SubmittingOrder,quantity, setQuantity,CustomerOrder,setCustomerOrder,customer_email, setcustomer_email}


// RETURNING AND EXPORTING THE REQUIRED MODULES
return (
    <AppContext.Provider value={AppContextValues}>
    {props.children}
    </AppContext.Provider>
    )}
export default AppContextProvider

