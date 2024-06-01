import axios from "axios";

const axiosInstance = axios.create({
    baseURL : import.meta.env.VITE_BACKEND_URL + '/api/v1',
    withCredentials : true,
})

axiosInstance.interceptors.request.use(function (config) {
    const token = sessionStorage.getItem('token');
    if (token) {
        config.headers.Authorization = 'Bearer ' + token
    }
    return config
})

export {
    axiosInstance
}