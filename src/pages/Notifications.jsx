import { collection, doc, getDoc, onSnapshot } from '@firebase/firestore'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import Applycard from '../components/Applycard'
import NotifyCard from '../components/NotifyCard'
import { database } from '../firebase-config'
import NotifyCard from '../components/NotifyCard'

const Notifications = () => {

    const [job, setjob] = useState({})

    
    const navigate = useNavigate()

    const [jobs, setjobs] = useState([])
    const collectionRef = collection(database, 'job');
    useEffect(() => {
        getJobs();
    }, [])

    const getJobs = async () => {
        const collectionRef = collection(database, "job");
        onSnapshot(collectionRef, (hacklist) => {
            setjobs(hacklist.docs);
        })
    }

  return (
    <div className='min-h-[630px] mx-[50px]'>

            <div class=" rounded-xl overflow-hidden bg-white   justify-between items-center my-1 mx-1 p-3">
                
                <hr></hr>
                <div>
                    <p className='font-bold text-2xl mt-2 mb-1'>Job Applications</p>
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