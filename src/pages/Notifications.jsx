import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import Applycard from '../components/Applycard'
import NotifyCard from '../components/NotifyCard'
import { app, database, storage } from '../firebase-config'
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, onAuthStateChanged, signOut, updateProfile } from "firebase/auth";
import { collection, addDoc, getDoc, getDocs, doc, updateDoc, deleteDoc, setDoc, onSnapshot, query, where, arrayUnion, arrayRemove } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { UserAuth } from '../contexts/AuthContext'

const Notifications = () => {
    const {user,logOut} = UserAuth()
    const navigate = useNavigate()
    const collectionRef = collection(database, "job");
    const [jobs, setjobs] = useState([])
    useEffect(() => {
        getJobs();
    }, [])

    const getJobs = async () => {
        
        const nameQuery=query(collectionRef,where("applicants","array-contains",user.uid))
        onSnapshot(nameQuery, (hacklist) => {
            setjobs(hacklist.docs);
        })
        console.log(jobs);
    }

  return (
    <div className='min-h-[630px] mx-[50px]'>

            <div class=" rounded-xl overflow-hidden bg-white   justify-between items-center my-1 mx-1 p-3">
                
                <hr></hr>
                <div>
                    <p className='font-bold text-2xl mt-2 mb-1'>Job Applications </p>
                    <div className='flex flex-col overflow-y-scroll max-h-[500px]'>

                        {jobs.map((item) => {

                            return (
                                <NotifyCard job={item.data()} />
                            );
                        }, [])}
                    </div>
                </div>
            </div>
        </div>
  )
}

export default Notifications