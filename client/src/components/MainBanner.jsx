import React from 'react'
import { assets } from '../assets/assets'
import { Link } from 'react-router-dom'

const MainBanner = () => {
    return (
        <div className='relative pt-[72px]'>
            <img src={assets.main_banner_bg} alt="banner" className='w-full hidden md:block rounded-2xl' />
            <img src={assets.main_banner_bg_sm} alt="banner" className='w-full md:hidden rounded-2xl'/>

            <div className='absolute inset-0 flex flex-col items-center md:items-start justify-center md:justify-center pt-24 pb-24 md:pb-0 px-4 md:pl-18 lg:pl-24'>
                <h1 className='text-[#333c35] text-3xl md:text-4xl lg:text-5xl font-bold text-center md:text-left 
  max-w-[200px] sm:max-w-[300px] md:max-w-[600px] lg:max-w-[750px] 
  leading-tight lg:leading-[1.3] mt-4 md:mt-0'>
                    From the farm to your basket —<br />
                    fast, fresh, and full of goodness!
                </h1>
                <div className='flex items-center mt-6 font-medium gap-x-10'>
                    <Link to={"/products"} className='group flex items-center gap-2 px-7 md:px-9 py-3 bg-primary hover:bg-primary-dull transition rounded text-white cursor-pointer'>
                        Shop now
                        <img className="md:hidden transition group-focus:translate-x-1" src={assets.white_arrow_icon} alt="arrow" />
                    </Link>
                    <Link to={"/products"} className='group hidden md:flex items-center gap-2 px-2 py-3 cursor-pointer'>
                        Explore deals
                        <img className="transition group-hover:translate-x-1" src={assets.black_arrow_icon} alt="arrow" />
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default MainBanner
