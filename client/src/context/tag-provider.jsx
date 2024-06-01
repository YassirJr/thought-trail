import {createContext, useCallback, useContext, useState} from "react";
import {memo} from "react";
import {tagsApi} from "@/services/api/tag-api.js";

export const TagStateContext = createContext({
    tags: [],
    setTags : () => {},
    getTags: () => {
    },

})

function TagContext({children}) {
    const [tags, setTags] = useState([])

    const getTags = useCallback(
        async () => {
            return await tagsApi.index()
        }, [])


    return (<>
        <TagStateContext.Provider value={{
            tags ,
            setTags,
            getTags
        }}>
            {children}
        </TagStateContext.Provider>
    </>)
}

export default memo(TagContext);
