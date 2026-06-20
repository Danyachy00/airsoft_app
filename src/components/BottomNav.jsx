import {Flag, User} from 'lucide-react'
import {NavLink} from 'react-router-dom'

const BottomNav = () => {
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
        </nav>
    )
}

export default BottomNav
