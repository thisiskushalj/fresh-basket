import React from 'react'
import MainBanner from '../components/MainBanner'
import Categories from '../components/Categories'
import BestSeller from '../components/BestSeller'
import BottomBanner from '../components/BottomBanner'
import FarmFresh from '../components/FarmFresh'
import BakerySpecials from '../components/BakerySpecials'
import CoolInTheHeat from '../components/CoolInTheHeat'
import FreshDairy from '../components/FreshDairy'
import PantryStaples from '../components/PantryStaples'
import FromTheButcher from '../components/FromTheButcher'
import Testimonial from '../components/Testimonial'
import NewsLetter from '../components/NewsLetter'

const Home = () => {
  return (
    <div className='mt-10'>
        <MainBanner/>
        <Categories/>
        <BestSeller/>
        <FarmFresh/>
        <BakerySpecials/>
        <CoolInTheHeat/>
        <FreshDairy/>
        <PantryStaples/>
        <FromTheButcher/>
        <BottomBanner/>
        <Testimonial/>
        <NewsLetter/>
    </div>
  )
}

export default Home
