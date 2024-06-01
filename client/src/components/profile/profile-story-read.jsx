import React from 'react';
import {Lock} from 'lucide-react'
import placeHolderImg from '@/assets/placeholder.svg'
import {useUser} from "@/context/index.jsx";
import {useNavigate} from "react-router-dom";
import {SAVED_STORIES_URL} from "@/constants/urls.js";

function ProfileStoryRead() {
    const {user} = useUser()
  const navigate = useNavigate()
    return (
        <div className='w-full my-10 border rounded px-8 py-8 cursor-pointer' onClick={()=> navigate(SAVED_STORIES_URL)}>
            <div className="flex justify-evenly items-center gap-10 relative">
                <div className="ls w-4/6">
                    <div className="flex justify-start items-center gap-4">
                        <img src={user?.photo} alt="user photo" width={45} className="rounded-full"/>
                        <span className="text-xs text-slate-500">
                            {user?.fname} {user?.lname}
                        </span>
                    </div>
                    <h1 className='text-2xl font-bold my-3'>
                        Reading List
                    </h1>
                    <p className='font-light text-slate-500 text-sm flex items-center gap-1'>
                        <span>No stories</span>
                        <Lock strokeWidth={1} className='w-5 h-5'/>
                    </p>
                </div>
                <div>
                    <img src={placeHolderImg}
                         className='rounded h-72'
                         alt=""/>
                </div>
            </div>
        </div>
    );
}

export default ProfileStoryRead;
