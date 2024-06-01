import {axiosInstance} from "@/http/axios.js";

export const tagsApi = {

    index: async () =>
        await axiosInstance.get('/tags'),

}