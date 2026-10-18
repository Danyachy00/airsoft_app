import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Calendar, MapPin, Pencil, Plus, Trash2 } from 'lucide-react'
import BottomNav from './BottomNav.jsx'
import { deleteGame, getGames } from '../helpers/games.js'

const AdminGames = () => {
    const navigate = useNavigate()
    const [games, setGames] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const [deletingId, setDeletingId] = useState(null)

    useEffect(() => {
        async function fetchGames() {
            try {
                setGames(await getGames())
            } catch (err) {
                setError('Не вдалось завантажити ігри')
                console.error(err)
            } finally {
                setLoading(false)
            }
        }
        fetchGames()
    }, [])

    async function handleDelete(game) {
        if (!window.confirm(`Видалити "${game.title}"? Цю дію не можна скасувати.`)) return

        setDeletingId(game.id)
        try {
            await deleteGame(game.id)
            setGames(prev => prev.filter(g => g.id !== game.id))
        } catch (err) {
            console.error(err)
            alert('Не вдалось видалити гру')
        } finally {
            setDeletingId(null)
        }
    }

    return (
        <div className="admin-page app-page">
            <div className="app-container">
                <div className="admin-header">
                    <div>
                        <h3 className="font-semibold text-2xl">Адмінка</h3>
                        <h1 className="font-bold text-3xl">Ігри</h1>
                    </div>
                    <button
                        type="button"
                        className="admin-button"
                        onClick={() => navigate('/admin/games/new')}
                    >
                        <Plus size={20}/>
                        Створити
                    </button>
                </div>

                <div className="admin-list">
                    {loading && <p>Завантаження...</p>}
                    {error && <p>{error}</p>}
                    {!loading && !error && games.length === 0 && <p>Ігор поки немає</p>}

                    {games.map(game => (
                        <div key={game.id} className="admin-item">
                            <h3 className="font-medium text-lg">{game.title}</h3>
                            <div className="flex gap-2">
                                <Calendar size={22} strokeWidth={1}/>
                                <p>{game.date}</p>
                            </div>
                            <div className="flex gap-2">
                                <MapPin size={22} strokeWidth={1}/>
                                <p>{game.location}</p>
                            </div>

                            <div className="admin-item__actions">
                                <button
                                    type="button"
                                    className="admin-button"
                                    onClick={() => navigate(`/admin/games/${game.id}/edit`)}
                                >
                                    <Pencil size={18}/>
                                    Редагувати
                                </button>
                                <button
                                    type="button"
                                    className="admin-button admin-button--danger"
                                    disabled={deletingId === game.id}
                                    onClick={() => handleDelete(game)}
                                >
                                    <Trash2 size={18}/>
                                    {deletingId === game.id ? 'Видаляємо...' : 'Видалити'}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <BottomNav/>
        </div>
    )
}

export default AdminGames
