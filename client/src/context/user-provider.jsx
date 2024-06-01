import {createContext, memo, useContext, useState} from "react";
import {userApi} from "@/services/api/user-api.js";
import {axiosInstance} from "@/http/axios.js";

export const UserStateContext = createContext({
    user: {},
    allUsers : [],
    authenticated: false,
    setUser: () => {},
    setAllUsers : () => {},
    logout: () => {},
    signin: (payload) => {},
    signup: (payload) => {},
    setAuthenticated: () => {},
    setToken: () => {},
})

function UserContext({children}) {
    const [user, setUser] = useState({})
    const [allUsers, setAllUsers] = useState([])
    const [authenticated, _setAuthenticated] = useState('true' === window.sessionStorage.getItem('authenticated'))

    const signin = async (payload) => {
        return await userApi.signin(payload)
    }

    const signup = async (payload) => {
        return await userApi.signup(payload)
    }


    const setAuthenticated = (isAuthenticated) => {
        _setAuthenticated(isAuthenticated)
        window.sessionStorage.setItem('authenticated', isAuthenticated)
    }

    const setToken = (token) => {
        window.sessionStorage.setItem('token', token)
    }

    const logout = async ()=> {
        const response = await axiosInstance.post("/auth/logout")
        setUser({})
        setAuthenticated(false)
        sessionStorage.clear();
        return response
    }
    return <>
        <UserStateContext.Provider value={{
            user,
            allUsers,
            signin,
            signup,
            logout,
            setUser,
            setAllUsers,
            authenticated,
            setAuthenticated,
            setToken
        }}>
            {children}
        </UserStateContext.Provider>
    </>
}
export default memo(UserContext);
