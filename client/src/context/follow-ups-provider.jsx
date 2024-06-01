import {createContext, useCallback, useContext, useState} from "react";
import {memo} from "react";
import {followUpApi} from "@/services/api/follow-up-api.js";


export const FollowUpStateContext = createContext({
    myFollowers: [],
    myFollowings: [],
    setMyFollowers: () => {
    },
    setMyFollowings: () => {
    },
    getMyFollowers: () => {
    },
    getMyFollowings: () => {
    },
})

function FollowUpContext({children}) {
    const [myFollowers, setMyFollowers] = useState([])
    const [myFollowings, setMyFollowings] = useState([])

    const getMyFollowers = useCallback(
        async () => {
            return await followUpApi.getFollowers()
        }, [])

    const getMyFollowings = useCallback(
        async () => {
            return await followUpApi.getFollowings()
        }, [])

    return (<>
        <FollowUpStateContext.Provider value={{
            myFollowers,
            myFollowings,
            setMyFollowers,
            setMyFollowings,
            getMyFollowers,
            getMyFollowings,
        }}>
            {children}
        </FollowUpStateContext.Provider>
    </>)
}

export default memo(FollowUpContext);
