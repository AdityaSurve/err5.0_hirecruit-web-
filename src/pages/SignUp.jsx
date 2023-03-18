import React, { useState } from 'react'
import { AiFillLock, AiOutlineClose, AiOutlineMail } from 'react-icons/ai'
import { Link, useNavigate } from 'react-router-dom'
import { UserAuth } from '../contexts/AuthContext'
import Particles from '../components/Particles'
import { app, database, storage } from '../firebase-config'
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, onAuthStateChanged, signOut, updateProfile } from "firebase/auth";
import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc,setDoc, onSnapshot, query, where } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

const SignUp = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()
  const { signUp } = UserAuth()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    try {
      await signUp(email, password)
      navigate('/')
    } catch (err) {
      setError(err.message)
      console.log(err.message)
    }
  }

  return (
    <>
      <Particles />
    <div className='max-w-[400px] mx-auto min-h-[600px] px-4 py-20 shadow-2xl mt-4 rounded-2xl bg-opacity-20 backdrop-blur-md drop-shadow-lg '
    >

      <div className='mb-4 text-center font-bold text-2xl'>
        SignUp
      </div>
      {error ? (<div className='flex w-full'>
        <span className='bg-red-500 text-white p-3 my-2 flex items-center justify-between w-full text-slice'>{error}
          <span><AiOutlineClose className='cursor-pointer' onClick={() => setError('')} /></span>
        </span>
      </div>) : null}
      <div>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Name</label>
            <div className='grid grid-cols-2 gap-5' >

              <div className=' w-full mb-3'>
                <div className='relative w-full my-2 rounded-2xl shadow-xl'>
                  <input onChange={(e) => setPassword(e.target.value)}
                    className='w-full bg-primary border border-input rounded-2xl p-2 outline-blue-400' type='text' placeholder='First Name...'
                    autoComplete="true" />
                  {/* <AiFillLock className='absolute right-2 top-3 text-gray-500' /> */}
                </div>
              </div>
              <div className=' w-full mb-3'>
                <div className='relative w-full my-2 rounded-2xl shadow-xl'>
                  <input onChange={(e) => setPassword(e.target.value)}
                    className='w-full bg-primary border border-input rounded-2xl p-2 outline-blue-400' type='text' placeholder='Last Name...'
                    autoComplete="true" />
                  {/* <AiFillLock className='absolute right-2 top-3 text-gray-500' /> */}
                </div>
              </div>
            </div>
          </div>
          <div className=' w-full mb-3'>
            <label>Email</label>
            <div className='relative w-full my-2 rounded-2xl shadow-xl'>
              <input onChange={(e) => setEmail(e.target.value)}
                className='w-full bg-primary border border-input rounded-2xl p-2  outline-blue-400' type='email' placeholder='Enter your email...' />
              <AiOutlineMail className='absolute right-2 top-3 text-gray-500' />
            </div>
          </div>
          <div className=' w-full mb-3'>
            <label>Password</label>
            <div className='relative w-full my-2 rounded-2xl shadow-xl'>
              <input onChange={(e) => setPassword(e.target.value)}
                className='w-full bg-primary border border-input rounded-2xl p-2 outline-blue-400' type='password' placeholder='Enter your password...'
                autoComplete="true" />
              <AiFillLock className='absolute right-2 top-3 text-gray-500' />
            </div>
          </div>
          <button className='bg-blue-400 rounded-2xl w-full hover:border-blue-300 border-2 border-white text-white font-bold text-xl py-1 mt-4' type='submit'>Sign Up</button>
          <button
            type="button"
            className="text-white bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center flex items-center dark:focus:ring-[#4285F4]/55 mx-auto my-3"
          >
            <svg
              class="w-4 h-4 mr-2 -ml-1"
              aria-hidden="true"
              focusable="false"
              data-prefix="fab"
              data-icon="google"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 488 512"
            >
              <path
                fill="currentColor"
                d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
              ></path>
            </svg>
            Sign up with Google
          </button>
        </form>
        <p className='text-gray-400 mt-4 text-sm'>Already have an account? <Link className='text-blue-400' to='/signin'>Sign In</Link></p>
      </div>
    </div>
      </>
  )
}

export default SignUp