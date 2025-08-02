import React from 'react'
import { assets } from '../assets/assets'

const Description = () => {
  return (
    <div className='flex flex-col justify-center items-center text-center m-24 p-6 md:px-28'>
      <h1 className='text-3xl sm:text-4xl font-semibold mb-2'>Create Your Dream Images</h1>
      <p className='text-gray-500 mb-8'>Unleash your creativity with our powerful image generation tool.
       </p>
       <div className='flex flex-col gap-5 md:gap-14 md:flex-row items-center'>
        <img src={assets.sample_img_1} alt="" className='w-80 xl:w-98 rounded-lg' />
        <div >
            <h2 className='text-3xl font-medium max-w-lg mb-4'>Introducing the Future of Image Generation</h2>
            <p className='text-gray-600 mb-4'>Experience the next generation of AI-powered image creation with our innovative platform.
               With advanced algorithms and a user-friendly interface, you can easily transform your ideas into stunning visuals.
              
            </p>
            <p className='text-gray-600 mb-4'>
                Join us on this exciting journey and discover how our image generation tool can revolutionize the way you create and share visual content.
                Start generating your dream images today and unlock a world of creative potential at your fingertips.
            </p>
            
        </div>
       </div>
    </div>
  )
}

export default Description
