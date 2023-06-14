import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Card = ({ job }) => {
  const navigate = useNavigate();

  return (
    <div className="m-2">
      <div className="max-w-[900px] h-full max-h-[500px]   rounded-xl overflow-hidden shadow-2xl bg-white   justify-between items-center my-1 mx-1 p-3">
        <div className="px-6 py-4 flex flex-col items-center">
          <div>
            <img
              className="w-[150px]  object-cover "
              src={
                job.logo
                  ? job.logo
                  : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3nw5s4HDs_lXgQDN1fMiCv8qoE0pQsFIOCg&usqp=CAU"
              }
              alt="Sunset in the mountains"
            />
          </div>
          <div className="font-bold text-xl mb-0 mx-3">{job.title}</div>
          <div className="font-semibold text-green-600 h-min mt-2  mb-2 text-sm bg-green-200 border-2 border-green-500 rounded-xl px-2">
            {job.ename}
          </div>
        </div>
        {/* <div>
                    <p className="text-gray-700 text-base">
                        {job.desc.slice(0,400)}...
                    </p>

                </div> */}
        <div className="flex flex-col justify-between">
          <div className="px-6 pt-4 pb-2">
            <span className="inline-block font-bold rounded-xl px-3 py-1 text-sm  bg-white text-blue-500 border-2 border-blue-500 mr-2 mb-2">
              {job.type}
            </span>
            <span className="inline-block font-bold rounded-xl px-3 py-1 text-sm  bg-white text-blue-500 border-2 border-blue-500 mr-2 mb-2">
              {job.location}
            </span>
          </div>
          <div className="flex w-full items-end justify-end">
            <button
              onClick={() => navigate(`/applications/${job.jobid}`)}
              className="bg-blue-500 ring-2 ring-offset-2 ring-blue-400 text-white font-semibold rounded-xl p-1 border-2 border-blue-600 hover:bg-blue-700"
            >
              <Link to="/jobapplications/:jobid" className="text-white ">
                View Applicants
              </Link>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
