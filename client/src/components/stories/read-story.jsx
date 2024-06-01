import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar.jsx";
import {Link, useNavigate, useParams} from "react-router-dom";
import React, {useEffect} from "react";
import {getFirstNameCharAndLastNameChar} from "@/utils/index.js";
import {EditIcon} from "lucide-react";
import {HOME_URL, STORY_EDIT_URL} from "@/constants/urls.js";
import {TooltipProvider, Tooltip, TooltipContent, TooltipTrigger} from "@/components/ui/tooltip.jsx";
import {useStory, useUser} from "@/context/index.jsx";

function ReadStory() {
    const navigate = useNavigate()
    const {id} = useParams()
    const {allStories} = useStory()
    const {user} = useUser()
    const story = allStories.find(e => e._id === id.toString())

    useEffect(() => {
        if (story === undefined) {
            navigate(HOME_URL)
        }
    }, []);
    return (
        <>
            <section className="relative w-full p-5">
                <img
                    alt="Story Cover"
                    className="h-[60vh] w-full object-cover object-center md:h-[80vh] rounded"
                    height={1080}
                    src={story?.official_photo}
                    style={{
                        aspectRatio: "1920/1080",
                        objectFit: "cover",
                    }}
                    width={1920}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-950 to-transparent"/>
                <div className="absolute inset-0 flex items-end justify-center pb-12 md:pb-16">
                    <div className="text-center text-gray-50">
                        <h1 className="text-3xl font-bold font-sans tracking-tight sm:text-4xl md:text-5xl lg:text-6xl">
                            {story?.title}
                        </h1>

                    </div>
                </div>
            </section>
            <article className="container mx-auto my-12 px-4 md:my-16 md:px-6 lg:my-20 font-sans">
                <header className="mb-8 flex flex-col items-center justify-between gap-4 md:flex-row md:gap-8">
                    <div className="space-y-1 text-center md:text-left">
                        <h2 className="text-2xl font-bold font-sans tracking-tight sm:text-3xl">
                            {story?.title}
                        </h2>
                        <p className="text-gray-500 dark:text-gray-400">By {story?.user?.fname} {story?.user?.lname}</p>
                    </div>
                    <div className="flex items-center gap-4">

                        <Avatar>
                            <AvatarImage alt="Jared Palmer" src={story?.user?.photo}/>
                            <AvatarFallback>
                                {
                                    getFirstNameCharAndLastNameChar(story?.user) || 'YJ'
                                }
                            </AvatarFallback>
                        </Avatar>
                        <div className="space-y-1">
                            <p className="text-sm font-medium">{story?.user?.fname} {story?.user?.lname}</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">Author</p>
                        </div>
                        {
                            story?.user?._id === user?._id && (
                                <TooltipProvider>
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <Link to={STORY_EDIT_URL(story?._id)}
                                                  className='flex justify-center items-center border border-[#129F5E] px-2 py-2 gap-2 rounded-full hover:bg-[#129F5E]'>
                                                <EditIcon strokeWidth={1} className='w-4 h-4'/>
                                            </Link>
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            <p>Edit story</p>
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                            )
                        }
                    </div>
                </header>
                <div className="prose prose-gray mx-auto font-sans font-light max-w-[800px] dark:prose-invert">
                    <div dangerouslySetInnerHTML={{__html: story?.content}}/>
                </div>
            </article>
        </>
    )
}

export default ReadStory
