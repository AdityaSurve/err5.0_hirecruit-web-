import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import TrendingCard from '../components/TrendingCard';
import { ReactSearchAutocomplete } from 'react-search-autocomplete'
import { app, database, storage } from '../firebase-config'
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, onAuthStateChanged, signOut, updateProfile } from "firebase/auth";
import { collection, addDoc, getDoc, getDocs, doc, updateDoc, deleteDoc, setDoc, onSnapshot, query, where, arrayUnion,getAll } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { async } from '@firebase/util';

const Search = () => {
  const collectionRef = collection(database, "job");
  const { topic } = useParams()
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('');

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const [jobs, setJobs] = useState([])
  const [jobsearch, setJobsearch] = useState([])
  useEffect(() => {
    getJobs();
  }, [])

  const getJobs = async () => {

    // onSnapshot(collectionRef, (hacklist) => {
    //   setjobs(hacklist.docs);
    // })

    try {
      const querySnapshot = await getDocs(collectionRef, 'job');
      var temp = [];
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        // setuser(doc.data())
        temp.push({ id: doc.data().jobid, name: doc.data().title });

      });

      setJobsearch([...temp])

    }
    catch {
      // seterr(true)
    }
  }

  const handleOnSearch = async(string, results) => {
    console.log(typeof(jobs));
    const refs=results.map((item)=>{
      const nameQuery=query(collectionRef,where("jobid","==",item.id))
      onSnapshot(nameQuery, (hacklist) => {
        setJobs(...jobs,hacklist.docs);
         })
    })
}

// const getDeets = async (jobId) => {
//   const docRef = doc(database, "job", jobId);
//   const docSnap = await getDoc(docRef);
//   setJobs(...jobs,docSnap.data())
// }
console.log(jobs)

  const handleOnHover = (result) => {
    // the item hovered
  }

  const handleOnSelect = (item) => {
    // the item selected
    // console.log(item)
    const nameQuery=query(collectionRef,where("jobid","==",item.id))
    onSnapshot(nameQuery, (hacklist) => {
      setJobs(...jobs,hacklist.docs);
       })
  }

  const handleOnFocus = () => {
  }

  const formatResult = (item) => {
    return (
      <>
        <span style={{ display: 'block', textAlign: 'left' }}>{item.name}</span>
      </>
    )
  }

  return (
    <div className={`min-h-[630px]  `} >
      <div className='flex flex-col  justify-center space-x-4 mt-6'>
        <p className='text-xl font-semibold text-center'>Search for a job of your Choice</p>
        <div className="flex  justify-center space-x-4 my-3">
          {/* <input
            type="text"
            value={searchTerm ? searchTerm : topic}
            onChange={handleSearchChange}
            placeholder="Search"
            className="py-2 px-4 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
          />
          <select
            value={filter}
            onChange={handleFilterChange}
            className="py-2 px-4 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
          >
            <option value="">All</option>
            <option value="fulltime">Fulltime</option>
            <option value="halftime">Halftime</option>
          </select>
          <button
            className="py-2 px-4 bg-purple-600 hover:bg-purple-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-opacity-50"
          >
            Search
          </button> */}

          <div style={{ width: 400 }}>
            <ReactSearchAutocomplete
              items={jobsearch}
              onSearch={handleOnSearch}
              // onSelect={handleOnSelect}
              autoFocus
              formatResult={formatResult}
            />
          </div>

        </div>
        <hr></hr>
        <div className='max-h-[680px] flex flex-col  justify-center items-center overflow-y-scroll'>

          {jobs?.map((item) => {

            return (
              <TrendingCard job={item.data()}/>
            );
          }, [])}
        </div>
      </div>
    </div>
  )
}

export default Search