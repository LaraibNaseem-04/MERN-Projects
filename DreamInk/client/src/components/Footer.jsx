import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <div className='flex flex-col sm:flex-row items-center justify-between gap-4 py-4 mt-20 border-t border-gray-200'>
      <p className='text-sm text-gray-500 mb-2 sm:mb-0'>
        &copy; 2025 DreamInk. All rights reserved.
      </p>
      <div className='flex gap-4'>
        <a href='#' aria-label='Facebook'>
          <img src={assets.facebook_icon} alt="Facebook" width={32} />
        </a>
        <a href='#' aria-label='Twitter'>
          <img src={assets.twitter_icon} alt="Twitter" width={32} />
        </a>
        <a href='#' aria-label='Instagram'>
          <img src={assets.instagram_icon} alt="Instagram" width={32} />
        </a>
      </div>
    </div>
  )
}

export default Footer
