import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets'
import { motion, AnimatePresence } from 'framer-motion'
import { AppContext } from '../context/AppContext'

const Result = () => {
  const [image,setImage] = useState(assets.sample_img_1)
  const [isImageLoaded, setImageLoaded] = useState(false)
  const [loading, setLoading] = useState(false)
  const [input, setInput] = useState('')

  const { generateImage } = useContext(AppContext)

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (!input) return;

    setLoading(true);
    try {
      const generatedImg = await generateImage(input);
      if (generatedImg) {
        setImage(generatedImg);
        setImageLoaded(true);
        console.log('Image loaded, isImageLoaded:', true);
      }
    } finally {
      setLoading(false);
    }
  }
  
  console.log('isImageLoaded:', isImageLoaded);

  return (
    <form
      onSubmit={onSubmitHandler}
      action=""
      className="flex flex-col min-h-[90vh] justify-center items-center"
    >
      <div className="text-center">
        <div
          className="relative inline-block group overflow-hidden rounded-lg shadow-lg"
        >
          <img src={image} className="max-w-sm w-full transition-transform duration-300 group-hover:scale-105" />
          {loading && (
              <div
                className="absolute inset-0 bg-black/50 backdrop-blur-sm flex flex-col justify-center items-center"
              >
                <div className="w-10 h-10 border-4 border-dashed rounded-full animate-spin border-white"></div>
                <p
                  className="mt-4 text-white/80"
                >
                  Generating...
                </p>
              </div>
            )}
        </div>
      </div>
        {!isImageLoaded ? (
          <div
            key="input-form"
            className="flex w-full max-w-xl bg-white/50 backdrop-blur-sm text-zinc-800 text-sm p-1 mt-10 rounded-full items-center shadow-md"
          >
            <input
              onChange={e => setInput(e.target.value)} value={input}
              type="text"
              placeholder="A synthwave style sunset over a retro-futuristic city..."
              className="flex-1 bg-transparent border-none outline-none ml-4 sm:ml-6 placeholder:text-gray-500"
            />
            <button
              className="bg-zinc-900 text-white px-6 sm:px-10 py-3 rounded-full flex items-center gap-2"
              type="submit"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 3c.3 0 .6.1.8.4l4.9 4.9c.2.2.4.5.4.8v8.8c0 .3-.1.6-.4.8l-4.9 4.9c-.2.2-.5.4-.8.4H7.1c-.3 0-.6-.1-.8-.4l-4.9-4.9c-.2-.2-.4-.5-.4-.8V9.1c0-.3.1-.6.4-.8l4.9-4.9c.2-.2.5-.4.8-.4h4.8z"></path>
                <path d="M12 8v8"></path>
                <path d="M9 11h6"></path>
              </svg>
              Generate
            </button>
          </div>
        ) : (
          <div
            key="action-buttons"
            className='flex gap-4 flex-wrap justify-center text-sm mt-10'
          >
            <p onClick={()=>{setImageLoaded(false); setInput('')}} className='bg-transparent border border-zinc-900 text-black px-8 py-3 rounded-full cursor-pointer'>Generate Another</p>
            <a href={image} download="dreamink-image.png" className='bg-zinc-900 text-white px-10 py-3 rounded-full cursor-pointer flex items-center gap-2'>
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line>
              </svg>
              Download
            </a>
          </div>
        )}
    </form>
  )
}

export default Result