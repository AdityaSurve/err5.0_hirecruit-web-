import { collection, onSnapshot } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import TrendingCard from '../components/TrendingCard';
import { database } from '../firebase-config';

const Search = () => {
  const { topic } = useParams()
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('');

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

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

  return (
    <div className='min-h-[630px] '>
      <div className='flex flex-col  justify-center space-x-4 mt-6'>

        <div className="flex  justify-center space-x-4 my-6 ">
          <input
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
          </button>
        </div>
        <hr></hr>
        <div className='max-h-[680px] flex flex-col  justify-center items-center overflow-y-scroll'>

        {jobs.map((item) => {
          
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