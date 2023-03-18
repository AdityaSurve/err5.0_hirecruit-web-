import React from 'react'
import { AiOutlineSearch } from 'react-icons/ai'
import TrendingCard from '../components/TrendingCard'
import './Home.css'

const Home = () => {
  return (
    <div>

      <div className='sm:grid grid-cols-2'>
        <div className='flex flex-col text-3xl font-bold  justify-center items-center '>
          <div className='text-left'>
            <p className=''>Find Your Dream Job Faster</p>
          </div>
          <div className=''>

            <div className='flex justify-center items-center border-2 rounded-full my-3 p-1'>

              <input placeholder='Search...' className='outline-none pl-2' type='text' />
              <div className='bg-gradient-to-r from-cyan-500 to-blue-500 text-white p-3 rounded-full '>
                <AiOutlineSearch />
              </div>
            </div>
          </div>
        </div>
        <div>
          <img src='http://access.imglarger.com:8889/results/T58ctb06_4x.jpg' alt='/' />
        </div>
      </div>


      <div className='flex justify-center items-center flex-col '>
        <div className='border-2 m-3 p-6 rounded-xl'>

        <div className='text-xl font-semibold my-2 text-center'>Trending Jobs</div>
        <hr></hr>
        <div className='flex flex-col'>
          <TrendingCard />
          <TrendingCard />
          <TrendingCard />
          <TrendingCard />
          <TrendingCard />
        </div>
      </div>
        </div>
    </div>
  )
}

export default Home