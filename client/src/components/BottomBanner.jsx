import React from 'react'
import { assets } from '../assets/assets'

const BottomBanner = () => {
  return (
    <div className='relative mt-16'>
        <img className='w-full hidden md:block rounded-2xl' src={assets.bottom_banner_image} alt="banner" />
        <img className='w-full md:hidden rounded-2xl' src={assets.bottom_banner_image_sm} alt="banner" />
    </div>
  )
}

export default BottomBanner
