import React from 'react'
import { AiOutlineInstagram } from 'react-icons/ai'
import { FaFacebookF, FaTwitter, FaGithub, FaLinkedin } from 'react-icons/fa'
import { Link } from 'react-router-dom'

const Footer = () => {
    return (
        <div className='flex justify-center w-full mt-10 z-5
        0'>

            <div className='bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-t-2xl pt-2 md:pl-16 w-full'>
                <div className='grid sm:grid-cols-3 w-full py-2'>
                    <div className='sm:flex flex-col pt-6 hidden '>
                        <p className='text-xl font-bold'>Discover the job that</p>
                        <p className='text-xl font-bold'>suits you, Today !</p>
                    </div>
                    <div className='p-4 '>
                        <div className='grid grid-cols-2'>
                            <div>
                                <h2 className='text-xl font-semibold mb-2'>Explore</h2>
                                <ul>
                                    <li className='text-sm font-light cursor-pointer'>Get Hired</li>
                                    <li className='text-sm font-light cursor-pointer'>Post a Job</li>
                                    <li className='text-sm font-light cursor-pointer'>Feedback</li>
                                </ul>
                            </div>
                            <div>
                                <h2 className='text-xl font-semibold mb-2'>Info</h2>
                                <ul>
                                    <li className='text-sm font-light cursor-pointer'>Profile</li>
                                    <li className='text-sm font-light cursor-pointer'>About Us</li>
                                    <li className='text-sm font-light cursor-pointer'>Resources</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className='flex justify-center flex-col items-center'>
                       
                        <p className='text-xl font-bold'>Socials</p>
                        <div className='sm:grid grid-cols-2  flex flex-col justify-around w-[50%] mt-2 text-xl cursor-pointer'>
                            <div className=''>
                                <div className='flex my-2'>

                                    <AiOutlineInstagram /> <span className='text-sm ml-2'>Instagram</span>
                                </div><div className='flex my-2'>

                                    <FaTwitter /> <span className='text-sm ml-2'>Twitter</span>
                                </div>
                            </div>
                            <div className=''>
                                <div className='flex my-2'>

                                    <FaFacebookF /> <span className='text-sm ml-2'>Facebook</span>
                                </div>
                                <div className='flex my-2'>

                                    <FaLinkedin /> <span className='text-sm ml-2'>LinkedIn</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <hr></hr>
                <p className='text-center text-xs py-3'>Copyright @ 2023 HireVerse - All rights reserved</p>
            </div>


        </div>
    )
}

export default Footer