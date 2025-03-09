import React from 'react'
import Hero from '../components/Hero'
import Shop from './Shop'
import { motion } from "framer-motion";

const Home = () => {
  const pageTransition = {
    initial: { scale: 0, rotateY: 45,opacity:0 },
    animate: { scale: 1, rotateY: 0 ,opacity:1},
    exit: { scale: 0, rotateY: 0,opacity:0 },
    transition: { duration: .7 }
  };

  return (
    <motion.div
    {...pageTransition}
    >
      <Hero />
      <Shop />
    </motion.div>
  )
}

export default Home
