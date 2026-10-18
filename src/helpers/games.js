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

export async function updateGame(id, payload) {
    const { data } = await axios.put(`/game/${id}`, payload)
    return data.data
}

export async function deleteGame(id) {
    await axios.delete(`/game/${id}`)
}

// Ендпоінт приймає тільки { rent, note }
export async function signUpForGame(id, { rent = false, note = '' } = {}) {
    const { data } = await axios.post(`/game/${id}/sign-up`, { rent, note })
    return data.data
}

export async function cancelSignUpForGame(id) {
    await axios.post(`/game/${id}/cancel`)
}
