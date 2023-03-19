import React, { useState } from 'react'
import { AiFillCaretUp, AiFillRightCircle, AiOutlineCheckCircle, AiOutlineCloseCircle } from 'react-icons/ai'
import { useNavigate } from 'react-router-dom'
import { app, database, storage } from '../firebase-config'
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, onAuthStateChanged, signOut, updateProfile } from "firebase/auth";
import { collection, addDoc, getDoc, getDocs, doc, updateDoc, deleteDoc, setDoc, onSnapshot, query, where, arrayUnion, arrayRemove } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

const NotifyCard = ({job}) => {
    const [accepted, setaccepted] = useState(false)
    const navigate = useNavigate()
    const [jobstate,setJobstate] = useState('Under Review')

    return (
        <div className=''>
            <div className=" rounded-xl overflow-hidden shadow-2xl bg-white   justify-between items-center my-1 mx-1 p-3">
                <div className="px-6 py-4 flex items-center">
                    <img
                        className='w-[150px]  object-cover'
                        src={job?.logo ? job?.logo : "https://img-prod-cms-rt-microsoft-com.akamaized.net/cms/api/am/imageFileData/RE4wB6L?ver=72af"}
                        alt="Sunset in the mountains"
                    />
                    <div className="font-bold text-xl mb-0 mx-3">{job.title}</div>
                    <div className='font-semibold text-green-600 h-min  mb-2 text-sm bg-green-200 border-2 border-green-500 rounded-xl px-2'>{job.type}</div>
                </div>
                <div>
                    <h3 className='font-bold text-xls'>{}</h3>
                    {job?.responsibilities?.map((exp) => {
                        return (
                            <div className='mt-3'>
                        <p className="text-gray-700 text-base">
                            {exp}
                        </p>
                    </div>
                    )
                    })}

                </div>
                <div>
                    {job?.desc?.slice(0,400)}
                </div>
                <div className='flex justify-between'>
                    <div className="px-6 pt-4 pb-2">
                        {job?.skills?.map((skill) => {
                            return (<span className="inline-block text-gray-200 rounded-xl px-3 py-1 text-sm font-semibold bg-blue-500 mr-2 mb-2">
                                {skill}
                            </span>)
                        })}
                    </div>
                    <div className='flex gap-2 px-6 pt-4 pb-2'>
                        
                        <button
                            className='bg-blue-500 flex text-white font-semibold rounded-xl gap-2 p-1 items-center '
                        >{jobstate} <AiFillCaretUp className='text-xl' /></button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NotifyCard