import {Link} from "react-router-dom";
import {useStory} from "@/context/index.jsx";
import SavedStoryCard from "@/components/saved-stories/saved-story-card.jsx";
import {STORY_CREATE_URL} from "@/constants/urls.js";

function SavedStoriesList() {
  const {savedStories} = useStory()
  return (
    <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Saved Stories</h1>
        <Link to={STORY_CREATE_URL} className="bg-[#129F5E] hover:bg-primary-600 text-white px-4 py-2 rounded-full">
          new story
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {
          savedStories.length > 0 ? (

            savedStories.map(({story}) => (
              <SavedStoryCard story={story}/>
            ))
          ) : (
            <h1>0 stories saved as now</h1>
          )
        }
      </div>
    </div>
  )
}

export default SavedStoriesList
