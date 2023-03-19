import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import Applycard from '../components/Applycard'
import { app, database, storage } from '../firebase-config'
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, onAuthStateChanged, signOut, updateProfile } from "firebase/auth";
import { collection, addDoc, getDoc, getDocs, doc, updateDoc, deleteDoc, setDoc, onSnapshot, query, where, arrayUnion, arrayRemove } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

const Jobapp = () => {
    const navigate = useNavigate()
    const { jobid } = useParams()
    const [job, setjob] = useState({})
    const [users, setusers] = useState([])
    const collectionRef = collection(database, "users" );

    useEffect(() => {
        getDeets();
        getJob();
    }, [])

    const getJob=async()=>{
      const docRef = doc(database, "job", jobid);
      const docSnap = await getDoc(docRef);
      setjob(docSnap.data())
    }

    const getDeets = async () => {
      const nameQuery=query(collectionRef,where("appliedfor","array-contains",jobid))
        // const docSnap = await getDoc(docRef);
        // setjob(docSnap.data())
        onSnapshot(nameQuery, (hacklist) => {
          setusers(hacklist.docs);
      })
    }

    return (
        <div className='min-h-[630px] mx-[50px]'>

            <div class=" rounded-xl overflow-hidden bg-white   justify-between items-center my-1 mx-1 p-3">
                <p className='font-bold text-2xl mt-2 mb-1'>Job Description</p>
                <div class="px-6 py-4 min-h-[150px] flex items-center">
                    <img
                        className='w-[150px]   object-cover'
                        src={job.logo ? job.logo : "https://img-prod-cms-rt-microsoft-com.akamaized.net/cms/api/am/imageFileData/RE4wB6L?ver=72af"}
                        alt="Sunset in the mountains"
                    />
                    <div className=' ml-5'>
                        <div class="text-xl">{job.title}</div>
                        <div className='flex font-semibold text-green-600 h-min w-min  mb-2 text-sm bg-green-200 border-2 border-green-500  rounded-xl px-2'>{job.ename}</div>
                    </div>
                    <div class="px-6 pt-4 pb-2">
                        <span class="inline-block text-gray-200 rounded-xl px-3 py-1 text-sm font-semibold bg-blue-500 mr-2 mb-2">
                            {job.type}
                        </span>
                        <span class="inline-block text-gray-200 rounded-xl px-3 py-1 text-sm font-semibold bg-blue-500 mr-2 mb-2">
                            {job.location}
                        </span>
                    </div>
                </div>
                <hr></hr>
                <div>
                    <p className='font-bold text-2xl mt-2 mb-1'>Job Applicants</p>
                    <div className='flex flex-col overflow-y-scroll max-h-[500px]'>

                        {users.map((item) => {

                            return (
                                <Applycard user={item.data()} jobid={jobid}/>
                            );
                        }, [])}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Jobapp