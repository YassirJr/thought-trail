import {Input} from "@/components/ui/input.jsx";
import {SearchIcon} from "lucide-react";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar.jsx";
import {useStory, useUser} from "@/context/index.jsx";
import TagsList from "@/components/tags/tags-list.jsx";
import {useEffect, useState} from "react";
import {getStoryAuthorFullName} from "@/utils/index.js";
import {ParallaxScroll} from "@/components/ui/parallax-scroll.jsx";
import {READ_STORY} from "@/constants/urls.js";
import {useNavigate} from "react-router-dom";


export default function TagsPage() {
  const {user} = useUser()
  const {allStories} = useStory()
  const [filteredData, setFilteredData] = useState([])
  const [selectedTag, setSelectedTag] = useState(null)
  const navigate = useNavigate()


  const filterData = (search) => {
    const data = allStories
    const filter = data.filter(
      story =>
        story?.tags?.filter(tag =>
          tag.name
            .toLowerCase()
            .includes(selectedTag || search?.toLowerCase())).length > 0
    )
    setFilteredData(filter)
  }


  const handleSearch = (search) => {
    setSelectedTag(null)
    filterData(search)
  };

  const listCards = filteredData.map((story) => (
    <div key={story?._id} className='border pb-3 rounded bg-gray-300 dark:bg-slate-900 cursor-pointer'
         onClick={() => navigate(READ_STORY(story?._id))}>
      <img
        alt="Story Thumbnail"
        className="rounded-t-md object-cover w-full"
        height={225}
        src={story?.official_photo}
        width={225}
      />
      <div className="px-2">
        <h3 className="text-lg font-semibold my-4">
          {
            story.title
          }
        </h3>
        <p className="text-gray-500 dark:text-gray-400 line-clamp-2">
          Dive into the world of JavaScript and learn how to create dynamic and interactive web applications.
        </p>
      </div>
      <div className='px-2'>
        <div className="flex items-center space-x-4">
          <Avatar className="w-8 h-8">
            <AvatarImage alt="Auhtor Avatar" src={story?.user.photo}/>
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <span className="my-2">
                        {
                          getStoryAuthorFullName(story)
                        }
                      </span>
        </div>
      </div>
    </div>
  ))

  useEffect(() => {
    filterData()
  }, [selectedTag]);

  useEffect(() => {
    setFilteredData(allStories)
  }, [allStories]);

  return (
    <section className="w-full py-8 md:py-12">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between mb-6 md:mb-8">
          <div className="relative w-full max-w-md">
            <Input
              className="pl-10 py-2 border flex justify-between hover:bg-gray-100 items-center rounded-full w-full bg-gray-200 text-black dark:bg-slate-900 dark:text-gray-300"
              placeholder="Search stories by tags..."
              onChange={(e) => handleSearch(e.target.value)}
              type="search"
            />
            <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5"/>
          </div>
          <div className="flex items-center space-x-4">
            <Avatar className="w-8 h-8">
              <AvatarImage alt="User Avatar" src={user?.photo}/>
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
          </div>
        </div>
        <nav className="flex flex-wrap gap-2 mb-6 md:mb-8">
          <TagsList event={(data) => {
            setSelectedTag(data)
          }}/>
        </nav>
        <div className="bg-white dark:bg-gray-900 rounded-md shadow-md">
          <ParallaxScroll listCards={listCards}/>
        </div>
      </div>
    </section>
  )
}



