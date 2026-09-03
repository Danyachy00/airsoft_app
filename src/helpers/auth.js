import { axios } from './axios'

export async function login(email, password) {
    const response = await axios.post('/auth/login', { email, password })
    const { token, user } = response.data.data

    localStorage.setItem('token', token)
    return user
}

export function logout() {
    localStorage.removeItem('token')
}

export function isAuthenticated() {
    return !!localStorage.getItem('token')
}