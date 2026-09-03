import {useEffect, useState} from 'react'
import {Calendar, ShieldCheck, User} from 'lucide-react'
import {currentUser} from '../data/data.js'
import BottomNav from './BottomNav.jsx'
import {getGames} from '../helpers/games.js'

const Profile = () => {
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
                        <p className="profile-label">Гравець</p>
                        <h1 className="profile-title">{currentUser.username}</h1>
                    </div>
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
