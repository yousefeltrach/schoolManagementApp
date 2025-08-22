import axios, { type AxiosInstance } from "axios"

export const axiosClient : AxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
        "Content-Type": "application/json",
        withCredentials: true,
    },
})

