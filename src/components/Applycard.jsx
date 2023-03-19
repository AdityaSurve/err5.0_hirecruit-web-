import React, { useState } from 'react'
import { AiFillRightCircle, AiOutlineCheckCircle, AiOutlineCloseCircle } from 'react-icons/ai'
import { useNavigate } from 'react-router-dom'

const Applycard = ({ job }) => {
    const navigate = useNavigate()
    const [jobstate,setJobstate] = useState('Under Review')

    return (
        <div className=''>
            <div className=" rounded-xl overflow-hidden shadow-2xl bg-white   justify-between items-center my-1 mx-1 p-3">
                <div className="px-6 py-4 flex items-center">
                    <img
                        className='w-[150px]  object-cover'
                        src={job.logo ? job.logo : "https://img-prod-cms-rt-microsoft-com.akamaized.net/cms/api/am/imageFileData/RE4wB6L?ver=72af"}
                        alt="Sunset in the mountains"
                    />
                    <div className="font-bold text-xl mb-0 mx-3">{job.title}</div>
                    <div className='font-semibold text-green-600 h-min  mb-2 text-sm bg-green-200 border-2 border-green-500 rounded-xl px-2'>{job.ename}</div>
                </div>
                <div>
                    <p className="text-gray-700 text-base">
                        {job.desc.slice(0, 400)}...
                    </p>

                </div>
                <div className='flex justify-between'>
                    <div className="px-6 pt-4 pb-2">
                        <span className="inline-block text-gray-200 rounded-xl px-3 py-1 text-sm font-semibold bg-blue-500 mr-2 mb-2">
                            {job.type}
                        </span>
                        <span className="inline-block text-gray-200 rounded-xl px-3 py-1 text-sm font-semibold bg-blue-500 mr-2 mb-2">
                            {job.location}
                        </span>
                    </div>
                    <div className='flex gap-2 px-6 pt-4 pb-2'>
                        <button
                            onClick={() => navigate(`/job/${job.jobid}`)}
                            className='flex bg-green-500 text-white font-semibold rounded-xl gap-2 p-1 items-center '
                        >{jobstate} <AiOutlineCheckCircle className='text-xl' /></button>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Applycard