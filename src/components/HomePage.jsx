import '/src/App.css'
import { useState, useEffect } from 'react'
import { useUser } from "../context/UserContext.jsx"
import GameCard from './GameCard.jsx'
import BottomNav from './BottomNav.jsx'
import { getGames } from '../helpers/games.js'

const HomePage = () => {
    const { user } = useUser()
    const [games, setGames] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    useEffect(() => {
        async function fetchGames() {
            try {
                const data = await getGames()
                setGames(data)
            } catch (err) {
                setError('Не вдалось завантажити ігри')
                console.error(err)
            } finally {
                setLoading(false)
            }
        }
        fetchGames()
    }, [])

    return (
        <div className="home-page app-page min-h-screen">
            <div className='home-header app-container'>
                <h3 className='font-semibold text-2xl'>Гравець</h3>
                <h1 className='font-bold text-3xl '>{user?.name}</h1>
            </div>

            <div className="game-list app-container">
                {loading && <p>Завантаження...</p>}
                {error && <p>{error}</p>}
                {!loading && !error && games.length === 0 && <p>Ігор поки немає</p>}
                {games.map(game => (
                    <GameCard key={game.id} game={game} />
                ))}
            </div>

            <BottomNav/>
        </div>
    )
}

export default HomePage