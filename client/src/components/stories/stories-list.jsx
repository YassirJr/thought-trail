import React from 'react';
import {Link} from "react-router-dom"
import Story from "@/components/stories/story-card.jsx";
import TagsList from "@/components/tags/tags-list.jsx";
import {PlusIcon} from "lucide-react";
import {TAGS_URL} from "@/constants/urls.js";
import WhoToFollow from "@/components/followers/who-to-follow.jsx";
import {Separator} from "@/components/ui/separator.jsx";
import {useStory, useTag} from "@/context/index.jsx";
import ReadingsListInfo from "@/components/stories/readings-list-info.jsx";

const StoriesList = () => {
    const {allStories} = useStory()
    return (
        <div className="mx-auto px-4 sm:px-6 lg:px-8 ">
            <div className='container md:mx-10 flex justify-center gap-16'>
                <div className='w-full md:w-2/3 h-full'>
                    {
                        allStories.map(e => (
                            <Story story={e} key={e._id}/>
                        ))
                    }
                </div>
                <div className="hidden md:block w-1/3 relative ">
                    <div className="h-full fixed border-s px-8 overflow-auto">
                        <div className="rs my-10 h-full">
                            <div className="my-5">
                                <div>
                                    <div className="flex justify-start items-center gap-2">
                                        <h1 className='font-extralight underline'>Recommended topics</h1>
                                        <PlusIcon strokeWidth={1}
                                                  className="w-5 h-5 text-black dark:text-gray-100 mr-4"/>
                                    </div>

                                    <nav className="flex justify-between items-center py-4 pe-5 relative">
                                        <TagsList/>
                                    </nav>
                                    <Link to={TAGS_URL} className="text-[#129F5E] text-sm">See more topics</Link>
                                </div>
                            </div>
                            <Separator/>
                            <div className="my-5">
                                <WhoToFollow/>
                            </div>
                            <Separator/>

                            <div className="my-5">
                                <ReadingsListInfo/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default StoriesList;


