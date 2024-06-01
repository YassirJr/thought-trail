import React from 'react';
import {Link} from 'react-router-dom'
import ProfileStoryRead from "@/components/profile/profile-story-read.jsx";
import {MANAGE_STORIES_URL} from "@/constants/urls.js";

function PublishingSettings() {
    return (
        <div className="my-10 font-extralight flex flex-col gap-4">
            <Link to={MANAGE_STORIES_URL} className="text-sm underline text-gray-800 dark:text-gray-400">Manage stories</Link>
            <ProfileStoryRead/>
        </div>
    );
}

export default PublishingSettings;
