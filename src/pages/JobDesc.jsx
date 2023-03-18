import React from 'react'

const JobDesc = () => {
  return (
    <div className='min-h-[630px]'>
            <div class="max-w-[700px] rounded-xl overflow-hidden bg-white   justify-between items-center my-1 mx-1 p-3">
                <div class="px-6 py-4 flex items-center">
                <img
                    className='w-[150px] h-[150px] object-cover'
                    src="https://img-prod-cms-rt-microsoft-com.akamaized.net/cms/api/am/imageFileData/RE4wB6L?ver=72af"
                    alt="Sunset in the mountains"
                />
                <div className='flex flex-col ml-5'>
                    <div class="font-bold text-3xl mb-3">Title</div>
                    <div className='font-semibold text-green-600 h-min  mb-2 text-sm bg-green-200 border-2 border-green-500 w-min rounded-xl px-2'>Employername</div>
                </div>
                </div>
                <div>
                    <p class="text-gray-700 text-base">
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                        Voluptatibus quia, nulla! Maiores et perferendis eaque,
                        exercitationem praesentium nihil.
                    </p>

                </div>
                <div className='flex justify-between'>
                <div class="px-6 pt-4 pb-2">
                    <span class="inline-block text-gray-200 rounded-xl px-3 py-1 text-sm font-semibold bg-blue-500 mr-2 mb-2">
                        Type
                    </span>
                    <span class="inline-block text-gray-200 rounded-xl px-3 py-1 text-sm font-semibold bg-blue-500 mr-2 mb-2">
                        location
                    </span>
                </div>
                <div>
                    <button 
                    // onClick={() => navigate(`/job/${job.job_id}`)}
                    className='bg-blue-500 text-white font-semibold rounded-xl p-1 border-2 border-blue-600 hover:bg-blue-700'>Apply Now</button></div>
                </div>
            </div>
            <hr></hr><hr></hr>
        </div>
  )
}

export default JobDesc