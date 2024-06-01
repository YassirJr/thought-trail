import React from 'react';
import {formatDistanceToNow} from "date-fns";
import {useStory, useUser} from "@/context/index.jsx";


function ProfileStoryCard({story}) {
    const {user} = useUser()
    const {myStories} = useStory()
    return (
        <div className='w-full my-3 border p-4 rounded hover:bg-gray-300 dark:hover:bg-gray-900'>
            <div className="flex justify-evenly items-center gap-10">
                <div className="ls w-2/3">
                    <div className="flex justify-start items-center gap-4">
                        <img src={user?.photo} alt="user photo" width={45}  className="rounded-full"/>
                        <span className="text-xs text-slate-500">
                            {user?.fname} {user?.lname}
                        </span>
                    </div>
                    <h1 className='text-2xl font-bold my-3 dark:text-gray-400 line-clamp-1' dangerouslySetInnerHTML={{__html : story?.content}}/>

                    <p className='font-light text-slate-500 text-sm'>
                        {formatDistanceToNow(myStories[0]?.publishedDate , {addSuffix : true })}
                    </p>
                </div>
                <div className="rs w-1/3">
                    <img src={story?.official_photo || "https://miro.medium.com/v2/resize:fit:4800/format:webp/1*zHUx-2nVuBuUrW5cnf0_Og.png"}

                         className='rounded h-52'
                         alt=""/>
                </div>
            </div>
        </div>
    );
}

export default ProfileStoryCard;
