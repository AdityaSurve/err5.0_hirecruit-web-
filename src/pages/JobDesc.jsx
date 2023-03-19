import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { app, database, storage } from '../firebase-config'
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, onAuthStateChanged, signOut, updateProfile } from "firebase/auth";
import { collection, addDoc, getDoc, getDocs, doc, updateDoc, deleteDoc, setDoc, onSnapshot, query, where, arrayUnion } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { UserAuth } from '../contexts/AuthContext'
import { AiOutlineCheck, AiOutlineCheckCircle } from 'react-icons/ai';

const JobDesc = () => {
    const [applied, setapplied] = useState(false)
    const { jobId } = useParams()
    const [job, setjob] = useState({})
    const {user,logOut} = UserAuth()
    const [fireuser, setfireuser] = useState({})
    useEffect(() => {
        getDeets();
        getfireuser();
    }, [])

    const getfireuser = async () => {
        const docRef = doc(database, "users", user.uid);
        const docSnap = await getDoc(docRef);
        setfireuser(docSnap.data())
    }

    const getDeets = async () => {
        const docRef = doc(database, "job", jobId);
        const docSnap = await getDoc(docRef);
        setjob(docSnap.data())
    }

    let longString = job.desc
    let newString = longString?.split('•').join('.<br>');

    const handleApply=()=>{
        const jobtoupdate = doc(database, 'job', jobId)
        updateDoc(jobtoupdate, {
          applicants:arrayUnion(user.uid)
        })
        const usertoupdate = doc(database, 'users', user.uid)
        updateDoc(usertoupdate, {
          appliedfor:arrayUnion(jobId)
        })
        setapplied(true)
        
    }

    return (
        <div className='min-h-[630px] mx-[50px]'>
            <div class=" rounded-xl overflow-hidden bg-white   justify-between items-center my-1 mx-1 p-3">
                <div class="px-6 py-4 flex items-center">
                    <img
                        className='w-[150px]  object-cover'
                        src={job.logo ? job.logo : "https://img-prod-cms-rt-microsoft-com.akamaized.net/cms/api/am/imageFileData/RE4wB6L?ver=72af"}
                        alt="Sunset in the mountains"
                    />
                    <div className='flex flex-col ml-5'>
                        <div class="font-bold text-3xl mb-3">{job.title}</div>
                        <div className='flex font-semibold text-green-600 h-min  mb-2 text-sm bg-green-200 border-2 border-green-500  rounded-xl px-2'>{job.ename}</div>
                    </div>
                </div>
                <div>


                </div>
                <div className='flex justify-between'>
                    <div class="px-6 pt-4 pb-2">
                        <span class="inline-block text-gray-200 rounded-xl px-3 py-1 text-sm font-semibold bg-green-500 mr-2 mb-2">
                            {job.type}
                        </span>
                        <span class="inline-block text-gray-200 rounded-xl px-3 py-1 text-sm font-semibold bg-green-500 mr-2 mb-2">
                            {job.location}
                        </span>
                        {fireuser?.skills?.map((skill) => {
                            return (<span className="inline-block text-gray-200 rounded-xl px-3 py-1 text-sm font-semibold bg-blue-500 mr-2 mb-2">
                                {skill}
                            </span>)
                        })}
                    </div>
                    <div>
                        
                        {applied||fireuser?.appliedfor?.includes(jobId)?<button
                            // onClick={() => navigate(`/job/${job.job_id}`)}
                            className='bg-green-500 text-white font-semibold rounded-xl p-1 border-2 border-green-600 hover:bg-green-700 mr-10 flex items-center gap-2' >Applied ! <AiOutlineCheckCircle />
                        </button>:<button
                            // onClick={() => navigate(`/job/${job.job_id}`)}
                            className='bg-blue-500 text-white font-semibold rounded-xl p-1 border-2 border-blue-600 hover:bg-blue-700 mr-10' onClick={handleApply}>Apply Now
                        </button>}
                    </div>
                    
                </div>
            </div>
            <hr></hr><hr></hr>
            <div dangerouslySetInnerHTML={{__html: newString}} className='mt-6'></div>
        </div>
    )
}

export default JobDesc