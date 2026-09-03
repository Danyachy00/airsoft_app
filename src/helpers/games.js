import { axios } from './axios'

export async function getGames() {
    const { data } = await axios.get('/game')
    return data.data // масив ігор
}

export async function getGame(id) {
    const { data } = await axios.get(`/game/${id}`)
    return data.data
}

export async function createGame(payload) {
    const { data } = await axios.post('/game', payload)
    return data.data
}

export async function deleteGame(id) {
    await axios.delete(`/game/${id}`)
}

export async function signUpForGame(id) {
    const { data } = await axios.post(`/game/${id}/sign-up`)
    return data.data
}

export async function cancelSignUpForGame(id) {
    await axios.post(`/game/${id}/cancel`)
}