import {axiosInstance} from "@/http/axios.js";

export const notificationApi = {
    index: async () =>
        await axiosInstance.get('/notifications'),

    markAsRead : async (payload) =>
        await axiosInstance.post('/notifications/mark-as-read' , payload),

    markAllAsRead : async () =>
        await axiosInstance.post('/notifications/mark-all-as-read')
}