import React from 'react'
import { assets } from '../assets/assets'
import { motion } from 'framer-motion'

const Description = () => {
  // Parent container variants to orchestrate the stagger effect
  const containerVariants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  // Variants for text elements to slide up and fade in
  const textVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100, damping: 12 },
    },
  };

  // Variant for the image to slide in from the left
  const imageVariants = {
    hidden: { x: -50, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 80, damping: 15 },
    },
  };

  // Variant for the text block to slide in from the right
  const textBlockVariants = {
    hidden: { x: 50, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 80, damping: 15 },
    },
  };

  return (
    <motion.div 
      className='flex flex-col justify-center items-center text-center my-24 p-6 md:px-28'
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      <motion.h1 variants={textVariants} className='text-3xl sm:text-4xl font-semibold mb-2'>Create Your Dream Images</motion.h1>
      <motion.p variants={textVariants} className='text-gray-500 mb-8'>Unleash your creativity with our powerful image generation tool.</motion.p>
       <div className='flex flex-col gap-5 md:gap-14 md:flex-row items-center'>
        <motion.img variants={imageVariants} whileHover={{ scale: 1.05 }} transition={{ duration: 0.3 }} src={assets.sample_img_1} alt="AI generated sample" className='w-80 xl:w-98 rounded-lg shadow-lg' />
        <motion.div variants={textBlockVariants} className='text-left'>
            <h2 className='text-2xl md:text-3xl font-medium max-w-lg mb-4'>Introducing the Future of Image Generation</h2>
            <p className='text-gray-600 mb-4'>Experience the next generation of AI-powered image creation with our innovative platform. With advanced algorithms and a user-friendly interface, you can easily transform your ideas into stunning visuals.</p>
            <p className='text-gray-600 mb-4'>Join us on this exciting journey and discover how our image generation tool can revolutionize the way you create and share visual content. Start generating your dream images today and unlock a world of creative potential at your fingertips.</p>
        </motion.div>
       </div>
    </motion.div>
  )
}

export default Description
