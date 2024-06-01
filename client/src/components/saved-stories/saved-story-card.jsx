import {Link} from "react-router-dom";
import {Avatar, AvatarFallback} from "@/components/ui/avatar.jsx";
import {getStoryAuthorFullName} from "@/utils/index.js";
import {formatDistanceToNow} from "date-fns";
import {READ_STORY} from "@/constants/urls.js";
import {
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuItem,
  ContextMenuContent,
  ContextMenuShortcut
} from "@/components/ui/context-menu.jsx";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent, AlertDialogDescription, AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from "@/components/ui/alert-dialog.jsx";
import {LogOut} from "lucide-react";
import {DropdownMenuShortcut} from "@/components/ui/dropdown-menu.jsx";
import {useStory, useUser} from "@/context/index.jsx";
import {storyApi} from "@/services/api/story-api.js";
import {toast} from "sonner";

function SavedStoryCard({story}) {
  const {user} = useUser()
  const {setSavedStories} = useStory()
  const handleDelete = async () => {
    const response = await storyApi.deleteSaveStory(story?._id)
    if (response.status === 200) {
      setSavedStories(prevState => prevState.filter(e => e?.story._id !== story?._id))
      toast(response.data.message + ' ✅', {
        description: new Date().toDateString()
      })
    }
  }
  return (
    <ContextMenu>
      <ContextMenuTrigger>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden border hover:border-dotted">
          <div>
            <img
              src={story?.official_photo}
              alt="Blog Story Image"
              width={400}
              height={225}
              className="w-full h-48 object-cover"
            />
          </div>
          <div className="p-4">
            <div className="flex items-center mb-2">
              <Avatar className="w-8 h-8 mr-2">
                <img src={story?.user?.photo} alt="Author Avatar"/>
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <div>
                <Link
                  to='#'
                  className="text-gray-800 dark:text-gray-200 font-medium hover:underline"

                >
                  {getStoryAuthorFullName(story)}
                </Link>
                <div className="text-gray-500 dark:text-gray-400 text-sm">
                  {
                    formatDistanceToNow(story.publishedDate)
                  }
                </div>
              </div>
            </div>
            <h1
              className="block text-gray-800 dark:text-gray-200 font-medium text-lg mb-2"

            >
              {story.title}
            </h1>

          </div>
        </div>
      </ContextMenuTrigger>
      <ContextMenuContent className="w-64">
        <ContextMenuItem inset onClick={() => READ_STORY(story?._id)} className="cursor-pointer">
          Read
        </ContextMenuItem>

        <AlertDialog>
          <AlertDialogTrigger className="w-full">
            <div
              className="text-sm text-start font-normal px-8 py-1.5  rounded cursor-pointer hover:bg-gray-100 hover:dark:bg-slate-800">
              <span>Delete</span>
            </div>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Confirm Delete ?</AlertDialogTitle>
              <AlertDialogDescription>
                <span className="font-extrabold">{user?.fname}</span> Are you sure you want to delete this saved story ?
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction className='bg-red-400 text-white hover:bg-red-500'
                                 onClick={handleDelete}>Continue</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </ContextMenuContent>
    </ContextMenu>
  )
}

export default SavedStoryCard
