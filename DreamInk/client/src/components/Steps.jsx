import React from 'react'
import { stepsData } from '../assets/assets'
import {motion} from 'framer-motion'


const Steps = () => {
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
    <motion.div 
      className='flex flex-col items-center justify-center my-32'
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
    >
       <motion.h1 variants={itemVariants} className='text-3xl sm:text-4xl font-semibold mb-2'>How it Works</motion.h1>
       <motion.p variants={itemVariants} className='text-lg text-gray-600 mb-8'>Tranfrom your Thoughts to Reality</motion.p>
       <motion.div variants={containerVariants} className='space-y-4 w-full max-w-3xl text-sm'>
        {stepsData.map((item,index)=>(
            <motion.div key={index} variants={itemVariants} className='flex items-center gap-4 p-5 px-8 bg-white/20 shadow-md border cursor-pointer hover:scale-[1.02] transition-all duration-300 rounded-lg'>
                <img width={40} src={item.icon} alt="" />       
                <div>
                    <h2 className='text-xl font-medium'>{item.title}</h2>
                    <p className='text-gray-500'>{item.description}</p>
                </div>
            </motion.div>
        ))}
       </motion.div>
    </motion.div>
  )
}

export default Steps
