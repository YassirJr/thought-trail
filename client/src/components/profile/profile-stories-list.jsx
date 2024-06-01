import React, { useState} from 'react';
import ProfileStoryCard from "@/components/profile/profile-story-card.jsx";
import {useStory} from "@/context/index.jsx";
import Pagination from "@/components/pagination/pagination.jsx";


function ProfileStoriesList() {
    const {myStories} = useStory()
    const [pagination, setPagination] = useState([])

    return (
        <div className="my-6">
            {
                pagination?.length > 0 ? (
                    pagination.map(e => (
                        <ProfileStoryCard story={e} key={e?._id} />
                    ))
                ): (
                    <h1 className="text-gray-800 dark:text-gray-400">
                        No story found
                    </h1>
                )
            }
            <Pagination values={myStories} setPagination={(data) => setPagination(data)} />

        </div>
    );
}

export default ProfileStoriesList;
