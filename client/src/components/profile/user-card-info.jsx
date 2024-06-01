import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import {getUserFullName} from "@/utils/index.js";
import {SETTINGS_URL} from "@/constants/urls.js";
import {useFollowUp, useUser} from "@/context/index.jsx";

function UserCardInfo() {
  const {user} = useUser()
  const {myFollowers, myFollowings} = useFollowUp()
  const [countFollowers, setCountFollowers] = useState(0)
  const [countFollowings, setCountFollowings] = useState(0)

  useEffect(() => {
    setCountFollowers(myFollowers?.length)
    setCountFollowings(myFollowings?.length)
  }, [myFollowers, myFollowings, user]);

  return (
    <div className='w-1/3 h-screen relative'>
      <div className="h-full w-full p-10 fixed border-s">
        <img alt="User avatar" src={user?.photo || 'https://github.com/shadcn.png'}
             className='rounded-full w-24'/>
        <h1 className='font-bold my-3'>{getUserFullName(user)}</h1>
        <p className='text-gray-500 font-thin'>{countFollowers} Followers</p>
        <p className='text-gray-500 font-thin mb-8'>{countFollowings} Followings</p>
        <Link to={SETTINGS_URL} className='text-[#129F5E] text-sm'>Edit profile</Link>
      </div>
    </div>
  );
}

export default UserCardInfo;
