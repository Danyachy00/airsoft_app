import {useEffect, useState} from 'react'
import {Link} from 'react-router-dom'
import {Calendar, Pencil, ShieldCheck, User} from 'lucide-react'
import BottomNav from './BottomNav.jsx'
import {useUser} from '../context/useUser.js'
import {isAdmin} from '../helpers/auth.js'
import {getGames} from '../helpers/games.js'

const Profile = () => {
    const {user} = useUser()
    const [games, setGames] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    useEffect(() => {
        async function fetchGames() {
            try {
                const data = await getGames()
                setGames(data)
            } catch (err) {
                setError('Не вдалося завантажити профіль')
                console.error(err)
            } finally {
                setLoading(false)
            }
        }

        fetchGames()
    }, [])

    const registeredGames = games.filter(game => game.is_registered || game.isRegistered)

    return (
        <div className="profile-page app-page">
            <div className="profile-container app-container">
                <section className="profile-card">
                    <div className="profile-avatar">
                        <User size={42} strokeWidth={1.5}/>
                    </div>

                    <div>
                        <p className="profile-label">{isAdmin(user) ? 'Адміністратор' : 'Гравець'}</p>
                        <h1 className="profile-title">{user?.name}</h1>
                    </div>
                </section>

                <section className="profile-info">
                    <div className="profile-info__row">
                        <p className="profile-label">Телефон</p>
                        <p>{user?.phone || '—'}</p>
                    </div>
                    <div className="profile-info__row">
                        <p className="profile-label">Вік</p>
                        <p>{user?.age ?? '—'}</p>
                    </div>
                    <div className="profile-info__row">
                        <p className="profile-label">Досвід гри</p>
                        <p>{user?.exp || '—'}</p>
                    </div>

                    <Link to="/profile/edit" className="profile-edit-button">
                        <Pencil size={18} strokeWidth={1.5}/>
                        Редагувати профіль
                    </Link>
                </section>

                <section className="profile-stats">
                    <div className="profile-stat">
                        <ShieldCheck strokeWidth={1.5}/>
                        <div>
                            <p className="profile-stat__value">{loading ? '...' : registeredGames.length}</p>
                            <p className="profile-stat__label">Активні записи</p>
                        </div>
                    </div>

                    <div className="profile-stat">
                        <Calendar strokeWidth={1.5}/>
                        <div>
                            <p className="profile-stat__value">{loading ? '...' : games.length}</p>
                            <p className="profile-stat__label">Доступні ігри</p>
                        </div>
                    </div>
                </section>

                {error && <p>{error}</p>}
            </div>

            <BottomNav/>
        </div>
    )
}

export default Profile
