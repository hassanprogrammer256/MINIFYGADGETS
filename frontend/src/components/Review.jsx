import React from 'react'
import { Card, Avatar, Rating} from "flowbite-react";
import {} from "react-feather";
import { All_Images} from '../assets/index';
import {motion} from "framer-motion";

const Review = () => {
  return (
    <motion.div
    className='cursor-pointer'
    >
      <Card className="max-w-sm my-5 shadow-card opacity-85 hover:opacity-100 transition-all">
      <div className="flex justify-end px-1 pt-1">

      </div>
      <div className="flex flex-col items-start px-3 pb-3">
      <div className="flex justify-between w-20">
          <div className='cursor-pointer'>
              <Avatar img={All_Images.headphones_1}  rounded className='shadow-card rounded-full scale-95 hover:scale-100 transition-all'>
              <div className="font-medium dark:text-white">
              </div>
                  </Avatar>
          </div>
      </div>
      <div>
        <Rating>
      <Rating.Star className='text-amber-300'/>
      <Rating.Star className='text-amber-300'/>
      <Rating.Star className='text-amber-300'/>
      <Rating.Star className='text-amber-300'/>
      <Rating.Star filled={false} />
    </Rating>
          </div>
        <h5 className="mb-1 text-xl font-medium text-black">Hassan Mahrez</h5>
        <span className="text-xl font-black text-gray-500 dark:text-gray-400">C.E.O Smart Agents</span>
        <p className='text-lg font-bold text-gray-900 text-left break-words wrap'>Lorem ipsum dolor sit amet consectetur </p>
      </div>
    </Card>
    </motion.div>

  )
}

export default Review
