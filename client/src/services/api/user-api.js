import {axiosInstance} from "@/http/axios.js";

export const userApi = {
    signin: async (payload) =>
        await axiosInstance.post("/auth/signin", payload),

    signup: async (payload) =>
        await axiosInstance.post("/auth/signup", payload),

    logout: async () =>
        await axiosInstance.post("/logout"),

    updateProfile: async (payload) =>
        await axiosInstance.post('/profile', payload)
    ,
    me: async () =>
        await axiosInstance.get("/users/me"),

    findAll : async () =>
        await axiosInstance.get("/users")
}