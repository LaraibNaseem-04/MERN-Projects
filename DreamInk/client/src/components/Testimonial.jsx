import React from 'react'
import { assets, testimonialsData } from '../assets/assets'
import { motion } from 'framer-motion'

const Testimonial = () => {
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
      className='flex flex-col items-center justify-center my-20 py-12'
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
        <motion.h1 variants={itemVariants} className='text-3xl sm:text-4xl font-semibold mb-2'>Customer Testimonials</motion.h1>
        <motion.p variants={itemVariants} className='text-gray-500 mb-12'>See what our users are saying about us!</motion.p>
        <motion.div variants={containerVariants} className='flex flex-wrap justify-center gap-6'>
            {testimonialsData.map((testimonial) => (
                <motion.div key={testimonial.name} variants={itemVariants}
                className='bg-white/20 p-8 sm:p-12 rounded-lg shadow-md w-80 m-auto cursor-pointer hover:scale-[1.02] transition-all'>
                    <div
                    className='flex flex-col items-center'>
                        <img src={testimonial.image} alt="" className='rounded-full w-14' />
                        <h2 className=' text-xl font-semibold mt-3'>{testimonial.name}</h2>
                        <p className='text-gray-500 mb-4'>{testimonial.role}</p>
                        <div className='flex mb-4'>
                            {Array(testimonial.stars).fill().map((item,index)=>(
                                <img key={index} src={assets.rating_star} alt="star" className='w-4 h-4 mr-1' />
                            ))}
                        </div>
                        <p className='text-center text-sm  text-gray-600'>{testimonial.text}</p>
                    </div>
                </motion.div>
            ))}     
        </motion.div>
    </motion.div>
  )
}

export default Testimonial
