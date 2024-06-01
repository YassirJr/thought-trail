import {createContext, useCallback, useContext, useState} from "react";
import {storyApi} from "@/services/api/story-api.js";
import {memo} from "react";

export const StoryStateContext = createContext({
  myStories: [],
  allStories: [],
  savedStories: [],
  getMyStories: () => {
  },
  getAllStories: () => {
  },
  setMyStories: () => {
  },
  setAllStories: () => {
  },
  getSavedStories: () => {
  },
  setSavedStories: () => {
  }
})

function StoryContext({children}) {
  const [myStories, setMyStories] = useState([])
  const [allStories, setAllStories] = useState([])
  const [savedStories, setSavedStories] = useState([])

  const getMyStories = useCallback(
    async () =>
      await storyApi.index()
    , [])

  const getAllStories = useCallback(
    async () =>
       await storyApi.getAll()
    , [])

  const getSavedStories = useCallback(
    async () =>
      await storyApi.getSavedStories()
    , [])

  return (<>
    <StoryStateContext.Provider value={{
      myStories,
      allStories,
      savedStories,
      getMyStories,
      getAllStories,
      getSavedStories,
      setMyStories,
      setAllStories,
      setSavedStories
    }}>
      {children}
    </StoryStateContext.Provider>
  </>)
}

export default memo(StoryContext);
