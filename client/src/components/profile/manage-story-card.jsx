import React from 'react';
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuSeparator, ContextMenuShortcut,
  ContextMenuTrigger, ContextMenuItem
} from "@/components/ui/context-menu.jsx";
import {BookOpenIcon, EditIcon, TrashIcon, XIcon} from "lucide-react";
import ProfileStoryCard from "@/components/profile/profile-story-card.jsx";
import {useStory} from "@/context/index.jsx";
import {HOME_URL, MANAGE_STORIES_URL, READ_STORY, STORY_EDIT_URL} from "@/constants/urls.js";
import {useNavigate} from "react-router-dom";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from "@/components/ui/alert-dialog.jsx";
import {storyApi} from "@/services/api/story-api.js";
import {toast} from "sonner";

function ManageStoryCard({story}) {
  const {myStories, setMyStories} = useStory()
  const deleteStory = async () => {
    try {
      setMyStories([...myStories.filter(e => e?._id !== story?._id)])
      const response = await storyApi.destroy(story?._id)
      if (response.status === 200) {
        toast("Story deleted successfully", {
          description: new Date().toDateString(),
          icon: <TrashIcon/>
        })
        navigate(MANAGE_STORIES_URL)
      }
    } catch (err) {
      toast("Internal server error", {
        description: new Date().toDateString(),
        icon: <XIcon/>,
      })
      navigate(HOME_URL)
    }
  }
  const navigate = useNavigate()
  return (
    <ContextMenu>
      <ContextMenuTrigger className="flex  items-center justify-center  rounded-md  text-sm">
        <ProfileStoryCard story={story}/>
      </ContextMenuTrigger>
      <ContextMenuContent className="w-64">
        <ContextMenuItem disabled>
          Actions
        </ContextMenuItem>
        <ContextMenuSeparator/>

        <ContextMenuItem inset onClick={() => navigate(READ_STORY(story?._id))}>
          Read
          <ContextMenuShortcut><BookOpenIcon strokeWidth={1} className='w-5 h-5'/></ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuItem inset onClick={() => navigate(STORY_EDIT_URL(story?._id))}>
          Edit
          <ContextMenuShortcut><EditIcon strokeWidth={1} className='w-5 h-5'/></ContextMenuShortcut>
        </ContextMenuItem>
        <div>
          <AlertDialog>
            <AlertDialogTrigger asChild
                                className='relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 hover:bg-gray-100 dark:hover:bg-gray-800'>
              <div className='ps-8'>
                Delete
                <ContextMenuShortcut><TrashIcon strokeWidth={1}
                                                className='w-5 h-5'/></ContextMenuShortcut>
              </div>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Confirm Delete</AlertDialogTitle>
                <AlertDialogDescription>
                  Are you sure you want delete this story ?
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={deleteStory}
                  className='bg-red-400 text-white hover:bg-red-500'>Continue</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </ContextMenuContent>
    </ContextMenu>
  );
}

export default ManageStoryCard;
