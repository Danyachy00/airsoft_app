import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { createGame, getGame, updateGame } from '../helpers/games.js'

const EMPTY_FORM = {
    title: '',
    date: '',
    location: '',
    total_to_rent: '',
    duration: '',
}

// Бек (Game::GAME_DATE_FORMAT = 'd.m.Y G:i') приймає і віддає дату як "25.10.2026 9:05":
// день і місяць з двома цифрами, година БЕЗ нуля попереду. Поле datetime-local
// працює з форматом "2026-10-25T09:05", тому перетворюємо в обидва боки.
const pad = n => String(n).padStart(2, '0')

function toApiDate(inputValue) {
    const match = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})/.exec(inputValue || '')
    if (!match) return ''

    const [, year, month, day, hours, minutes] = match
    return `${day}.${month}.${year} ${Number(hours)}:${minutes}`
}

function toInputDate(apiValue) {
    const match = /^(\d{2})\.(\d{2})\.(\d{4}) (\d{1,2}):(\d{2})$/.exec(apiValue || '')
    if (!match) return ''

    const [, day, month, year, hours, minutes] = match
    return `${year}-${month}-${day}T${pad(Number(hours))}:${minutes}`
}

const AdminGameForm = () => {
    const navigate = useNavigate()
    const { id } = useParams()
    const isEdit = Boolean(id)

    const [form, setForm] = useState(EMPTY_FORM)
    const [loading, setLoading] = useState(isEdit)
    const [saving, setSaving] = useState(false)
    const [error, setError] = useState('')

    useEffect(() => {
        if (!id) return

        async function fetchGame() {
            try {
                const game = await getGame(id)
                setForm({
                    title: game.title ?? '',
                    date: toInputDate(game.date),
                    location: game.location ?? '',
                    total_to_rent: game.total_to_rent ?? '',
                    duration: game.duration ?? '',
                })
            } catch (err) {
                setError('Не вдалось завантажити гру')
                console.error(err)
            } finally {
                setLoading(false)
            }
        }
        fetchGame()
    }, [id])

    const handleChange = field => e =>
        setForm(prev => ({ ...prev, [field]: e.target.value }))

    async function handleSubmit(e) {
        e.preventDefault()
        setSaving(true)
        setError('')

        const payload = {
            ...form,
            date: toApiDate(form.date),
            total_to_rent: Number(form.total_to_rent),
        }

        try {
            if (isEdit) {
                await updateGame(id, payload)
            } else {
                await createGame(payload)
            }
            navigate('/admin')
        } catch (err) {
            console.error(err)
            const status = err?.response?.status
            if (status === 403) {
                setError('Немає прав адміністратора')
            } else if (status === 422) {
                const errors = err?.response?.data?.errors ?? {}
                const first = Object.values(errors)[0]?.[0]
                setError(first ? `Бек відхилив дані: ${first}` : 'Перевір поля: бек відхилив дані')
            } else {
                setError('Не вдалось зберегти гру')
            }
        } finally {
            setSaving(false)
        }
    }

    if (loading) return <p className="app-page app-container">Завантаження...</p>

    return (
        <div className="admin-page app-page">
            <div className="app-container">
                <button
                    type="button"
                    onClick={() => navigate('/admin')}
                    className="text-zinc-400 text-[18px] mb-4"
                >
                    {'< Назад до списку'}
                </button>

                <h1 className="font-bold text-2xl mb-5">
                    {isEdit ? 'Редагування гри' : 'Нова гра'}
                </h1>

                <form className="admin-form" onSubmit={handleSubmit}>
                    <label className="admin-field">
                        <span>Назва</span>
                        <input
                            required
                            value={form.title}
                            onChange={handleChange('title')}
                            placeholder="Гра №3"
                        />
                    </label>

                    <label className="admin-field">
                        <span>Дата і час</span>
                        <input
                            required
                            type="datetime-local"
                            value={form.date}
                            onChange={handleChange('date')}
                        />
                    </label>

                    <label className="admin-field">
                        <span>Локація</span>
                        <input
                            required
                            value={form.location}
                            onChange={handleChange('location')}
                            placeholder="Ужгород"
                        />
                    </label>

                    <label className="admin-field">
                        <span>Кількість місць</span>
                        <input
                            required
                            type="number"
                            min="1"
                            value={form.total_to_rent}
                            onChange={handleChange('total_to_rent')}
                        />
                    </label>

                    <label className="admin-field">
                        <span>Тривалість</span>
                        <input
                            required
                            value={form.duration}
                            onChange={handleChange('duration')}
                            placeholder="2 год 30 хв"
                        />
                    </label>

                    {error && <p className="admin-error">{error}</p>}

                    <button type="submit" className="admin-button admin-button--wide" disabled={saving}>
                        {saving ? 'Зберігаємо...' : isEdit ? 'Зберегти зміни' : 'Створити гру'}
                    </button>
                </form>
            </div>
        </div>
    )
}

export default AdminGameForm
