import { useState } from 'react'
import { login } from '../helpers/auth'

function TestLoginButton() {
    const [loading, setLoading] = useState(false)

    async function handleClick() {
        setLoading(true)
        try {
            const user = await login('user1@example.com', 'password')
            console.log('Успішно залогінились:', user)
            alert(`Привіт, ${user.name}!`)
        } catch (err) {
            console.error('Помилка логіну:', err)
            alert('Помилка логіну, дивись консоль (F12)')
        } finally {
            setLoading(false)
        }
    }

    return (
        <button onClick={handleClick} disabled={loading}>
            {loading ? 'Заходимо...' : 'Тест логіну'}
        </button>
    )
}

export default TestLoginButton