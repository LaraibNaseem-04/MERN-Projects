import React, { useState } from 'react'
import { assets } from '../assets/assets'
import { motion, AnimatePresence } from 'framer-motion'

const Result = () => {
  const [image,setImage] = useState(assets.sample_img_1)
  const [isImageLoaded, setImageLoaded] = useState(false)
  const [loading, setLoading] = useState(false)
  const [input, setInput] = useState('')

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (!input.trim()) {
      // Don't submit if input is empty
      return;
    }
    setLoading(true);
    // TODO: Implement your image generation API call here
    // This is a mock for the API call
    console.log("Generating image for:", input);
    setTimeout(() => {
      setImage(assets.sample_img_2); // Mock new image
      setImageLoaded(true);
      setLoading(false);
    }, 3000); // Mock 3 second loading time
  }
  
  return (
    <motion.form
      onSubmit={onSubmitHandler}
      action=""
      className="flex flex-col min-h-[90vh] justify-center items-center"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="text-center">
        <motion.div className="relative inline-block" layout>
          <img src={image} className="max-w-sm rounded-lg shadow-lg" />
          <span
              className={`absolute bottom-0 left-0 h-1 bg-blue-500 transition-all duration-[3s] 
              ${loading ? 'w-full' : 'w-0'}`}
          />
        </motion.div>
        <AnimatePresence>
          {loading && (
            <motion.p
              className="mt-2 text-gray-600"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0.5, 1, 0.5], transition: { repeat: Infinity, duration: 1.5 } }}
              exit={{ opacity: 0 }}
            >
              Loading...
            </motion.p>
          )}
        </AnimatePresence>
      </div>
      <AnimatePresence mode="wait">
        {!isImageLoaded ? (
          <motion.div
            key="input-form"
            className="flex w-full max-w-xl bg-white/50 backdrop-blur-sm text-zinc-800 text-sm p-1 mt-10 rounded-full items-center shadow-md"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
          >
            <input
              onChange={e => setInput(e.target.value)} value={input}
              type="text"
              placeholder="Describe your image..."
              className="flex-1 bg-transparent border-none outline-none ml-8 max-sm:w-20 placeholder:text-gray-500"
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-zinc-900 text-white px-10 sm:px-16 py-3 rounded-full"
              type="submit"
            >
              Generate
            </motion.button>
          </motion.div>
        ) : (
          <motion.div
            key="action-buttons"
            className='flex gap-4 flex-wrap justify-center text-sm mt-10'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
          >
            <motion.p onClick={()=>{setImageLoaded(false); setInput('')}} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className='bg-transparent border border-zinc-900 text-black px-8 py-3 rounded-full cursor-pointer'>Generate Another</motion.p>
            <motion.a href={image} download whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className='bg-zinc-900 text-white px-10 py-3 rounded-full cursor-pointer'>Download</motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.form>
  )
}

export default Result
