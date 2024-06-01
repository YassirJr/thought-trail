import {axiosInstance} from "@/http/axios.js";

export const followUpApi = {

    getFollowers: async () =>
        await axiosInstance.get('/follow-ups/followers'),

    getFollowings: async () =>
        await axiosInstance.get('/follow-ups/followings'),

    follow: async (payload) =>
        await axiosInstance.post('/follow-ups/follow', payload),

    unfollow: async (payload) =>
        await axiosInstance.post('/follow-ups/unfollow', payload)
}
