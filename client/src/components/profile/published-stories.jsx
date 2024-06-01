import React, {useState} from 'react';
import ManageStoryCard from "@/components/profile/manage-story-card.jsx";
import {useStory} from "@/context/index.jsx";
import Pagination from "@/components/pagination/pagination.jsx";

function PublishedStories() {
    const [pagination, setPagination] = useState([]);
    const {myStories} = useStory()
    return (
        <div>
            {
                pagination.length > 0 ? (
                    pagination.map(story => (
                        <div  key={story?._id}>
                            <ManageStoryCard story={story}/>
                        </div>
                    ))
                ) : (
                    <h1 className="text-gray-800 dark:text-gray-400">
                        No story found
                    </h1>
                )
            }
            <Pagination values={myStories} setPagination={data => setPagination(data)}/>
        </div>
    );
}

export default PublishedStories;
