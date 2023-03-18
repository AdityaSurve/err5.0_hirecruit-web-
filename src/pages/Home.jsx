import React,{useEffect,useState} from 'react'
import { AiOutlineSearch } from 'react-icons/ai'
import TrendingCard from '../components/TrendingCard'
import './Home.css'
import axios from 'axios'
import { app, database, storage } from '../firebase-config'
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, onAuthStateChanged, signOut, updateProfile } from "firebase/auth";
import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc,setDoc, onSnapshot, query, where } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { async } from '@firebase/util'
import { useNavigate } from 'react-router-dom'

const Home = () => {
  const [search,  setSearch] = useState('')
  const navigate = useNavigate()

  const [jobs, setjobs] = useState([])
  useEffect(() => {
    getJobs();
  }, [])

  const getJobs=async()=>{
    const collectionRef = collection(database, "job");
    onSnapshot(collectionRef, (hacklist) => {
      setjobs(hacklist.docs);
    })
  }
  

  const handleAxios=()=>{
    console.log("hello");
  const options = {
    method: 'GET',
    url: 'https://jsearch.p.rapidapi.com/search',
    params: { query: 'developer', page: '1', num_pages: '1' },
    headers: {
      'X-RapidAPI-Key': '48334e4faemsh146b66580f9c961p13d654jsnfb3484c3b23a',
      'X-RapidAPI-Host': 'jsearch.p.rapidapi.com'
    }
  };

  axios.request(options).then(function (response) {
    console.log(response.data.data);
    const arr=response.data.data;
    for (let i = 7; i < arr.length; i++) {
      const element = arr[i];
      setDoc(doc(database, "job", element.job_id), {
        jobid:element.job_id,
        title:element?.job_title?element.job_title:element.job_job_title,
        logo:element?.employer_logo,
        ename:element?.employer_name,
        desc:element?.job_description,
        type:element?.job_employment_type,
        skills:element?.job_required_skills,
        location:element?.job_city+" "+element?.job_state+" "+element?.job_country,
        resp:element.job_highlights?.Responsibilities,
        qual:element.job_highlights?.Qualifications
      })
      console.log("done");
    }
  }).catch(function (error) {
    console.error(error);
  });
  }


  return (
    <div>
      
      <div className='sm:grid grid-cols-2'>
        <div className='flex flex-col text-3xl font-bold  justify-center items-center '>
          <div className='text-left'>
            <p className=''>Find Your Dream Job Faster</p>
          </div>
          <div className=''>

            <div className='flex justify-center items-center border-2 rounded-full my-3 p-1'>

              <input placeholder='Search...' className='outline-none pl-2' type='text' 
              onChange={(e) => setSearch(e.target.value)}/>
              <div className='bg-gradient-to-r from-cyan-500 to-blue-500 text-white p-3 rounded-full cursor-pointer '
              onClick={() => navigate(`/search/${search}`)}>
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

        <div className='text-xl font-semibold my-2 text-center'>Recommended Jobs</div>
        <hr></hr>
        <div className='flex flex-col overflow-y-scroll max-h-[500px]'>
          
          {jobs.map((item) => {
            
          return (
            <TrendingCard job={item.data()}/>
          );
        }, [])}
        </div>
      </div>
    </div>
    </div>
  )
}

export default Home