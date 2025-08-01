import React from 'react';
import { assets } from '../assets/assets';

const Header = () => {
  return (
    <div className="flex flex-col items-center justify-center text-center mt-24 px-4">
      {/* Tagline */}
      <div className="inline-flex items-center gap-2 bg-white px-6 py-1 rounded-full border border-gray-300 text-sm text-gray-600 shadow-sm">
        <p>Best AI-Powered Text-to-Image Generator</p>
        <img src={assets.star_icon} alt="star icon" className="h-4 w-4" />
      </div>

      {/* Title */}
      <h1 className="text-4xl sm:text-7xl font-bold mt-10 leading-tight">
        Turn text to <span className="text-blue-600">image</span>,<br className="hidden sm:block" /> in seconds
      </h1>

      {/* Description */}
      <p className="text-gray-600 text-base sm:text-lg max-w-2xl mt-6">
        Transform your words into stunning visuals with our AI-powered image generator. From simple prompts to imaginative masterpieces — create art, fast and effortlessly.
      </p>

      {/* CTA Button */}
      <button className="mt-8 px-8 py-3 bg-black text-white rounded-full text-base sm:text-lg flex items-center gap-2 shadow-md hover:bg-gray-800 transition-all duration-200">
        Generate Images
        <img src={assets.star_group} alt="sparkle" className="h-5" />
      </button>

      {/* Sample Images */}
      <div className="flex flex-wrap justify-center mt-16 gap-3">
        {Array(6).fill('').map((item, index) => (
          <img
            className="rounded hover:scale-105 transition-all duration-300 cursor-pointer max-sm:w-10"
            key={index}
            src={index % 2 === 0 ? assets.sample_img_2 : assets.sample_img_1}
            width={70}
            alt={`sample-${index}`}
          />
        ))}
      </div>
      {/* footer part */}
      <p className='mt-2 text-neutral-600'>
        Generated images from DreamInk
      </p>
    </div>
  );
};

export default Header;
