import baseAxios from 'axios'

export const axios = baseAxios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
})

axios.interceptors.request.use((config) => {
   /* const token = localStorage.getItem('token')*/
   /* if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }*/
    config.headers.Authorization = `Bearer 15|g7Z7Fm4U697zhTHFPq0F201kBgWMGxaFzskKCpV8951736b6`
    return config
})

axios.interceptors.response.use(
    (response) => response,
    (error) => {
        console.error('API error:', error?.response?.status, error?.response?.data)
        return Promise.reject(error)
    }
)