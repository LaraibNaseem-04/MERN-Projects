import React from 'react'
import { assets } from '../assets/assets'
import { motion } from 'framer-motion'
import { AppContext } from '../context/AppContext'
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'

const GenerateBtn = () => {
    const {user,setShowLogin} = useContext(AppContext);
    const navigate = useNavigate();
    const onClickHandler = ()=>{
      if(user)
      {
            navigate('/result')
      }
      else{
        setShowLogin(true)
      }
  }
  // Parent container variants to orchestrate the stagger effect
  const containerVariants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  // Variants for each item to slide up and fade in
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
      },
    },
  };

  return (
    <motion.div className='pb-16 text-center' variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.5 }}>
      <motion.h1 variants={itemVariants} className='text-2xl md:text-3xl lg:text-4xl mt-4 font-semibold text-neutral-800 py-6
      md:py-16'>To generate your image, click the button below:</motion.h1>
      <motion.button onClick={onClickHandler} variants={itemVariants} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className='
      inline-flex items-center gap-3 px-12 py-3 rounded-full bg-black text-white m-auto'>Generate Images
        <img src={assets.star_group} alt="" 
        className='h-6'/>
      </motion.button>
    </motion.div>
  )
}

export default GenerateBtn
