import {createContext, useCallback, useContext, useState} from "react";
import {memo} from "react";
import {notificationApi} from "@/services/api/notification-api.js";

export const NotificationStateContext = createContext({
    myNotifications: [],

    getMyNotifications: () => {
    },
    setMyNotifications: () => {
    },
})

function NotificationContext({children}) {
    const [myNotifications, setMyNotifications] = useState([])


    const getMyNotifications = useCallback(
        async () => {
            return await notificationApi.index()
        }, [])


    return (<>
        <NotificationStateContext.Provider value={{
            myNotifications,
            getMyNotifications,
            setMyNotifications,
        }}>
            {children}
        </NotificationStateContext.Provider>
    </>)
}

export default memo(NotificationContext);
