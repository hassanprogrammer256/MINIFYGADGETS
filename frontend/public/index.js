import min_logo from '/images/Minify_Logo.png'
import contacts from '/images/NiceImages/contact.png'
import headphones_1 from '/images/NiceImages/n-1.jpeg'
import headphones_100 from '/images/NiceImages/n-100.jpeg'
import hassan from '/images/NiceImages/h-1.png'

import tab_icon from '/images/icons/tablets.webp'
import laptop_icon from '/images/icons/mac.webp'
import tv_icon from '/images/icons/tvs.webp'
import repair_icon from '/images/icons/repair.webp'
import speakers_icon from '/images/icons/speakers.webp'
import gamepad_icon from '/images/icons/gaming.webp'
import accessories_icon from '/images/icons/pods.webp'
import home_appliances_icon from '/images/icons/home.jpg'

import banner_bg from '/images/NiceImages/herobg.png'

export const Brands = ["iPhone","Samsung","Tecno","Realme","Google","Infinix","Oppo","Hisense","Speakers","Console","Covers"]
export const Categories = ['All','UK-Used','Best Deals','Trending','Brand-New']

export const NavLinks = ['home','shop']

export  const All_Images = {min_logo,headphones_1,banner_bg,contacts,headphones_100,hassan,tab_icon,tv_icon,repair_icon,speakers_icon,laptop_icon,gamepad_icon,accessories_icon,home_appliances_icon}

export const Products = [
{
    name:'Phones',
    image: headphones_1
},
{
    name:'Televisions',
    image: tv_icon
},
{
    name:'Repair Spare',
    image: repair_icon
},
{
    name:'Systems',
    image: speakers_icon
},
{
    name:'Tablets',
    image: tab_icon
},
{
    name:'Laptops',
    image: laptop_icon
},
{
    name:'Gaming',
    image: gamepad_icon
},
{
    name:'Home Appliances',
    image: home_appliances_icon
},
{
    name:'Accessories',
    image: accessories_icon
},

]

export const NavMenu= [{description:'Home',Link:'/'},{description:'Shop',Link:'/shop'}];