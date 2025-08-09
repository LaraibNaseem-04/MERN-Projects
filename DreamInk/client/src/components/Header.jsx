import React, { useContext } from 'react';
import { assets } from '../assets/assets';
import { motion } from "motion/react";
import App from '../App';
import { AppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';

const Header = () => {

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
  // Parent container variants to orchestrate stagger effect
  const containerVariants = {
    hidden: { opacity: 1 }, // Parent is initially visible, children are not
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  // Variants for text and button elements to slide up and fade in
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

  // Variants for the individual images to pop in
  const imageVariants = {
    hidden: { scale: 0.5, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 15,
      },
    },
  };

  return (
    <motion.div
      className="flex flex-col items-center justify-center text-center mt-24 px-4"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
    >
      {/* Tagline */}
      <motion.div variants={itemVariants} className="inline-flex items-center gap-2 bg-white px-6 py-1 rounded-full border border-gray-300 text-sm text-gray-600 shadow-sm">
        <p>Best AI-Powered Text-to-Image Generator</p>
        <img src={assets.star_icon} alt="star icon" className="h-4 w-4" />
      </motion.div>

      {/* Title */}
      <motion.h1 variants={itemVariants} className="text-4xl sm:text-7xl font-bold mt-10 leading-tight">
        Turn text to <span className="text-blue-600">image</span>,<br className="hidden sm:block" /> in seconds
      </motion.h1>

      {/* Description */}
      <motion.p variants={itemVariants} className="text-gray-600 text-base sm:text-lg max-w-2xl mt-6">
        Transform your words into stunning visuals with our AI-powered image generator. From simple prompts to imaginative masterpieces — create art, fast and effortlessly.
      </motion.p>

      {/* CTA Button */}
      <motion.button
        variants={itemVariants}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="mt-8 px-8 py-3 bg-black text-white rounded-full text-base sm:text-lg flex items-center gap-2 shadow-md hover:bg-gray-800 transition-all duration-200"
       onClick={onClickHandler}>
        Generate Images
        <img src={assets.star_group} alt="sparkle" className="h-5" />
      </motion.button>

      {/* Sample Images */}
      <motion.div variants={itemVariants} className="flex flex-wrap justify-center mt-16 gap-3">
        {Array(6).fill('').map((item, index) => (
          <motion.img
            variants={imageVariants}
            className="rounded hover:scale-105 transition-all duration-300 cursor-pointer max-sm:w-10"
            key={index}
            src={index % 2 === 0 ? assets.sample_img_2 : assets.sample_img_1}
            width={70}
            alt={`sample-${index}`}
          />
        ))}
      </motion.div>
      {/* footer part */}
      <motion.p variants={itemVariants} className='mt-2 text-neutral-600'>
        Generated images from DreamInk
      </motion.p>
    </motion.div>
  );
};

export default Header;
