import { axios } from './axios'

const USER_KEY = 'user'

function storeUser(user) {
    localStorage.setItem(USER_KEY, JSON.stringify(user))
}

export async function getProfile() {
    const { data } = await axios.get('/profile')
    storeUser(data.data)
    return data.data
}

// Приймає { name, phone, age, exp }
export async function updateProfile(payload) {
    const { data } = await axios.patch('/profile', payload)
    storeUser(data.data)
    return data.data
}
