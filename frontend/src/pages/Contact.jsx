import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import NewsLetterBox from '../components/NewsLetterBox'

const Contact = () => {
  return (
    <div>
      <div className='text-center text-2xl pt-10 border-t'>
        <Title text1={'CONTACT '} text2={'US'} />
      </div>
      <div className='my-10 flex flex-col justify-center md:flex-row gap-10 mb-28'>
        <img className='w-full md:max-w-[480px]' src={assets.contact_img} alt="" />
        <div className='flex flex-col justify-center items-start gap-6'>
          <p className='text-xl text-gray-600 font-semibold'>Our Store</p>
          <p className='text-gray-500 '>54709 Willms Station
          <br/>Suite 350, Washington, USA</p>
          <p className='text-gray-500 '>Tel: (415) 555-0132<br/>Email: dharmika@forever.com</p>
          <p className='font-semibold text-gray-600 text-xl'>Careers at Forever</p>
          <p className='text-gray-500 '>Learn more about our teams and job openings.</p>
          <button className='border border-black px-8 py-4 hover:bg-black text-sm hover:text-white transition:all duration-500'>Explore Jobs</button>
        </div>
      </div>
      <NewsLetterBox/>
    </div>

  )
}

export default Contact
