import placeholder_photo from "@/assets/placeholder.svg";
import React, {useEffect, useState} from "react";
import {getUserFullName} from "@/utils/index.js";
import {Button} from "@/components/ui/button.jsx";
import {CheckIcon} from "lucide-react";
import {useFollowUp, useUser} from "@/context/index.jsx";
import {followUpApi} from "@/services/api/follow-up-api.js";
import {notificationSocket} from "@/services/socket/notification-socket.js";

const WhoToFollow = () => {
  const {allUsers, user: {_id}} = useUser();
  const {myFollowings} = useFollowUp()
  const [whoToFollow, setWhoToFollow] = useState([]);

  useEffect(() => {
    if (allUsers) {
      const followingIds = new Set(myFollowings);
      const notFollowing = allUsers.filter(user => !followingIds.has(user._id));
      setWhoToFollow(notFollowing)
    }
  }, [allUsers , myFollowings]);

  const handleFollow = async (userId) => {
    const response = await followUpApi.follow({targetUserId: userId})
    if (response.status === 200) {
      notificationSocket.newFollow({followerId: _id, followeeId: userId})
    }
    setWhoToFollow(
      whoToFollow.map(e => {
        if (e._id === userId) {
          return {...e, isFollowed: !e.isFollowed};
        }
        return e;
      })
    );
  };

  return (
    <div className="rounded-lg">
      <h2 className="font-extralight mb-2 underline">Who to follow</h2>
      {whoToFollow.map((user) => (
        <div key={user?._id} className="flex items-center justify-between mb-2">
          <div className="flex items-center">
            <img
              src={user.photo || placeholder_photo}
              alt="User Avatar"
              className="w-8 h-8 rounded-full mr-2"
            />
            <div>
              <h3 className="text-sm ">{getUserFullName(user)}</h3>
            </div>
          </div>
          <Button className="bg-[#129F5E] text-white rounded-lg px-4 text-xs hover:bg-[#129F7E]"
                  onClick={() => handleFollow(user._id)}>
            {
              user?.isFollowed ? (
                <div className="flex justify-center items-center gap-2">
                  <span>Followed</span>
                  <CheckIcon/>
                </div>
              ) : (
                <span>Follow</span>
              )
            }
          </Button>
        </div>
      ))}
    </div>
  );
};

export default WhoToFollow
