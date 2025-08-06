import React from 'react'
import { assets } from '../assets/assets'

const OurPolicy = () => {
  return (
    <div className='flex flex-col sm:flex-row justify-around gap-12 sm:gap-2 text-center py-20 text-xs sm:text-sm md:text-base text-gray-700'>
      <div>
        <img className='w-12 m-auto mb-' src={assets.exchange_icon} alt="" />
        <p className='font-semibold'>Easy Exchange Policy</p>
        <p className="text-gray-400">We offer hassle free exchange policy</p>
      </div>
      <div>
        <img className='w-12 m-auto mb-' src={assets.quality_icon} alt="" />
        <p className='font-semibold'>7 Days Return Policy</p>
        <p className="text-gray-400">We provide 7 days free policy</p>
      </div>
      {/* <div>
        <img className='w-12 m-auto mb-' src={assets.support_img} alt="" />
        <p className='font-semibold'>Best Customer Support</p>
        <p className="text-gray-400">We provide 24/7 customer support</p>
      </div> */}
      <div>
        <img className='w-12 m-auto mb-' src={assets.support_img} alt="" />
        <p className='font-semibold'>AI powered Fashion Stylist</p>
        <p className="text-gray-400">Your personal fashion assistant</p>
      </div>
    </div>
  )
}

export default OurPolicy
