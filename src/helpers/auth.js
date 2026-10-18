import { axios } from './axios'

const TOKEN_KEY = 'token'
const USER_KEY = 'user'

function saveSession(token, user) {
    localStorage.setItem(TOKEN_KEY, token)
    localStorage.setItem(USER_KEY, JSON.stringify(user))
}

export async function login(email, password) {
    const response = await axios.post('/auth/login', { email, password })
    const { token, user } = response.data.data

    saveSession(token, user)
    return user
}

export async function loginTelegram(initData) {
    const response = await axios.post('/auth/telegram', { initData })
    const { token, user } = response.data.data

    saveSession(token, user)
    return user
}

export function logout() {
    localStorage.removeItem(TOKEN_KEY)
    localStorage.removeItem(USER_KEY)
}

export function isAuthenticated() {
    return !!localStorage.getItem(TOKEN_KEY)
}

// Юзер, збережений після останнього логіну. Потрібен, щоб після
// перезавантаження сторінки (F5, прямий лінк на /admin) не втрачати користувача.
export function getStoredUser() {
    try {
        if (!isAuthenticated()) return null
        const raw = localStorage.getItem(USER_KEY)
        return raw ? JSON.parse(raw) : null
    } catch {
        return null
    }
}

// Бек віддає поле isAdmin (camelCase); is_admin лишаємо на випадок snake_case у відповіді.
export function isAdmin(user) {
    return Boolean(user?.isAdmin ?? user?.is_admin)
}
