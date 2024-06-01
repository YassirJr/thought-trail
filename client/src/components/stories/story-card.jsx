import {useNavigate} from "react-router-dom";
import React, {useEffect, useRef} from "react";
import {motion, useAnimation, useInView} from "framer-motion";
import {READ_STORY} from "@/constants/urls.js";
import {calculateReadingTime, getStoryAuthorFullName, getUserFullName} from "@/utils/index.js";
import {formatDistanceToNow} from "date-fns";
import {
  BookmarkCheckIcon,
  BookmarkPlusIcon,
  BookOpenIcon,
  EllipsisIcon, HeartIcon,
  RssIcon,
  UserPlusIcon,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem,
  DropdownMenuLabel, DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu.jsx";
import {Separator} from "@/components/ui/separator.jsx";
import {followUpApi} from "@/services/api/follow-up-api.js";
import {notificationSocket} from "@/services/socket/notification-socket.js";
import {useFollowUp, useStory, useUser} from "@/context/index.jsx";
import {storyApi} from "@/services/api/story-api.js";
import {toast} from "sonner";
import HeartRedIcon from "@/components/icons/HeartRedIcon.jsx";
import {TooltipProvider, Tooltip, TooltipContent, TooltipTrigger} from "@/components/ui/tooltip.jsx";


function Story({story}) {
  const navigate = useNavigate()
  const ref = useRef(null);
  const isInView = useInView(ref, {once: true});
  const controls = useAnimation();
  const {user} = useUser()
  const {setMyFollowings, myFollowers, myFollowings} = useFollowUp()
  const {setSavedStories, getSavedStories, savedStories, setAllStories} = useStory()


  const followAuthor = async () => {
    const response = await followUpApi.follow({targetUserId: story.user?._id})
    if (response.status === 200) {
      notificationSocket.newFollow({followerId: user?._id, followeeId: story?.user?._id})
      setMyFollowings(response.data.data)
    }
  }

  const saveStoryInLibrary = async () => {
    const response = await storyApi.saveStory({story: story?._id})
    if (response.status === 200) {
      const savedStories = await getSavedStories()
      if (savedStories.status === 200 && savedStories.data.success) {
        setSavedStories(savedStories.data.data)
        toast(response.data.message + ' ✅', {
          description: new Date().toDateString(),
        })
      }
    } else if (response.status === 400) {
      toast(response.data.message, {
        description: new Date().toDateString(),
      })
    }
  }

  const handleStoryLike = async () => {
    if (!isLiked()) {
      const response = await storyApi.addLike({storyId: story._id})
      if (response.status === 201) {
        notificationSocket.newLike({likerFullName: getUserFullName(user), postAuthorId: story?.user?._id})
        setAllStories(prevState => {
          return prevState.map(e => {
            if (e._id === story._id) {
              if (!!e.likes) {
                return {...e, likes: [...e.likes, user._id]};
              } else return {...e, likes: [user._id]}
            }
            return e;
          });
        });
      }
    } else {
      const response = await storyApi.removeLike(story?._id)
      if (response.status === 200) {
        setAllStories(prevState => {
          return prevState.map(e => {
            if (e._id === story._id) {
              return {...e, likes: [...e.likes.filter(like => like !== user?._id)]};
            }
            return e;
          });
        });
      }
    }
  }

  const isStoryAuthorInMyFollowings = () => {
    const isFollow = myFollowings?.find(follower => follower === story.user?._id)
    return !!isFollow
  }

  const isSavedStory = () => {
    const isSaved = savedStories?.find(e => e?.story?._id === story?._id)
    return !!isSaved
  }

  const isLiked = () => {
    return !!story?.likes?.includes(user?._id)
  }


  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView])

  return (
    // grid grid-cols-1  md:grid-cols-[2fr_1fr]
    <div className=" gap-8 max-w-4xl mx-auto my-12 px-4 md:px-0">
      <motion.div
        ref={ref}
        variants={{
          hidden: {opacity: 0,},
          visible: {opacity: 1,},
        }}
        transition={{
          type: "spring",
          duration: 0.3,
          delay: 0.3,
          stiffness: 120,
        }}
        initial="hidden"
        animate={controls}
        className='dark:hover:bg-gray-950 dark:bg-gray-900 bg-gray-100 hover:bg-gray-200  p-3 rounded transition-all'>
        <div className="flex justify-between items-center">

          <div className="flex my-4 items-center space-x-4 text-gray-500 dark:text-gray-400">
            <div>
              <img
                alt="Author Avatar"
                className="rounded-full"
                height={32}
                src={story.user.photo}
                style={{
                  aspectRatio: "32/32",
                  objectFit: "cover",
                }}
                width={32}
              />
            </div>
            <div>
              <span className="underline">{getStoryAuthorFullName(story)}</span>
              <span className="mx-2">•</span>
              <span className='font-light text-sm'>
                                {
                                  formatDistanceToNow(new Date(story?.publishedDate), {addSuffix: true})
                                }
                            </span>
            </div>
          </div>
          <div>
            {
              isStoryAuthorInMyFollowings()
              && (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <RssIcon strokeWidth={0.75} className='mx-2'/>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>You followed the story author</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              )
            }
          </div>
        </div>

        <div>
          <img
            alt="Featured Image"
            className="rounded-lg object-cover w-full aspect-[3/1] cursor-pointer"
            height={200}
            src={story?.official_photo}
            width={400}
            onClick={() => navigate(READ_STORY(story?._id))}
          />
          <div className="mt-6 space-y-2">
            <h1 className='text-2xl font-bold my-3 text-gray-700 dark:text-gray-400 line-clamp-1'>
              {story?.title || 'test'}
            </h1>
          </div>
          <div className='text-sm text-gray-500 font-extralight flex justify-between'>
            <div className='flex justify-center items-center gap-5'>
              <span className='hover:scale-110 cursor-pointer flex items-center gap-1' onClick={handleStoryLike}>
                {
                  isLiked() ? (
                    <HeartRedIcon/>
                  ) : (
                    <HeartIcon strokeWidth={0.75} className='w-5 h-5'/>
                  )
                }

                <span>{story?.likes?.length}</span>
              </span>
              <span className='flex items-center gap-1'>
                <BookOpenIcon strokeWidth={0.75}
                              className='w-5 h-5'/> {calculateReadingTime(story.content)} min read
              </span>

            </div>
            <div className='z-50 flex items-center justify-center gap-1'>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <EllipsisIcon strokeWidth={1}
                                className='hover:text-black dark:hover:text-gray-100'/>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                  <DropdownMenuLabel>More info</DropdownMenuLabel>
                  <DropdownMenuSeparator/>
                  <DropdownMenuGroup>

                    <DropdownMenuItem onClick={saveStoryInLibrary} disabled={isSavedStory()}>
                      {
                        !isSavedStory()
                          ? (
                            <>
                              <BookmarkPlusIcon strokeWidth={0.75} className='mx-2'/>
                              Add to library
                            </>
                          )
                          :
                          (
                            <>
                              <BookmarkCheckIcon strokeWidth={0.75} className='mx-2'/>
                              Saved
                            </>
                          )
                      }
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={followAuthor} disabled={isStoryAuthorInMyFollowings()}>
                      {
                        !isStoryAuthorInMyFollowings()
                          ? (
                            <>
                              <UserPlusIcon strokeWidth={0.75} className='mx-2'/>
                              Follow author
                            </>
                          )
                          :
                          (
                            <>
                              <RssIcon strokeWidth={0.75} className='mx-2'/>
                              Followed
                            </>
                          )
                      }

                    </DropdownMenuItem>

                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
        <Separator className='my-3'/>
      </motion.div>
      {/* related posts ... */}
    </div>
  )
}

export default Story
