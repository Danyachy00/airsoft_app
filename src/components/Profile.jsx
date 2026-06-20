import {Calendar, ShieldCheck, User} from 'lucide-react'
import {currentUser} from '../data/data.js'
import BottomNav from './BottomNav.jsx'

const Profile = ({games}) => {
    const registeredGames = games.filter(game => game.isRegistered)

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
                            <p className="profile-stat__value">{registeredGames.length}</p>
                            <p className="profile-stat__label">Активні записи</p>
                        </div>
                    </div>

                    <div className="profile-stat">
                        <Calendar strokeWidth={1.5}/>
                        <div>
                            <p className="profile-stat__value">{games.length}</p>
                            <p className="profile-stat__label">Доступні ігри</p>
                        </div>
                    </div>
                </section>
            </div>

            <BottomNav/>
        </div>
    )
}

export default Profile
