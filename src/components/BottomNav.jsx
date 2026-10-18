import {Flag, ShieldCheck, User} from 'lucide-react'
import {NavLink} from 'react-router-dom'
import {useUser} from '../context/useUser.js'
import {isAdmin} from '../helpers/auth.js'

const BottomNav = () => {
    const {user} = useUser()

    return (
        <nav className='bottom-nav'>
            <NavLink
                to="/games"
                className={({isActive}) =>
                    `bottom-nav__button ${isActive ? 'bottom-nav__button--active' : ''}`
                }
            >
                <Flag strokeWidth={1.5}/>
                <p>Доступні ігри</p>
            </NavLink>

            <NavLink
                to="/profile"
                className={({isActive}) =>
                    `bottom-nav__button ${isActive ? 'bottom-nav__button--active' : ''}`
                }
            >
                <User size={26} strokeWidth={1.5}/>
                <p>Особистий профіль</p>
            </NavLink>

            {isAdmin(user) && (
                <NavLink
                    to="/admin"
                    className={({isActive}) =>
                        `bottom-nav__button ${isActive ? 'bottom-nav__button--active' : ''}`
                    }
                >
                    <ShieldCheck size={26} strokeWidth={1.5}/>
                    <p>Адмінка</p>
                </NavLink>
            )}
        </nav>
    )
}

export default BottomNav
