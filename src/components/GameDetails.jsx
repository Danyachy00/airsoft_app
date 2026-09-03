import { useNavigate, useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { Calendar, MapPin, Users, LucideClock, ChevronDown, ChevronLeft } from "lucide-react"
import { getGame, signUpForGame, cancelSignUpForGame } from '../helpers/games'

const GameDetails = () => {
    const navigate = useNavigate()
    const { id } = useParams()
    const gameId = Number(id)

    const [game, setGame] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const [isOpen, setIsOpen] = useState(false)
    const [actionLoading, setActionLoading] = useState(false)

    async function loadGame() {
        setLoading(true)
        try {
            const data = await getGame(gameId)
            setGame(data)
        } catch (err) {
            setError('Не вдалось завантажити гру')
            console.error(err)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => { loadGame() }, [gameId])

    async function handleCancelRegistration() {
        setActionLoading(true)
        try {
            await cancelSignUpForGame(gameId)
            await loadGame()
        } catch (err) {
            console.error(err)
            alert('Не вдалось скасувати запис')
        } finally {
            setActionLoading(false)
        }
    }

    if (loading) return <p className="app-page app-container">Завантаження...</p>
    if (error) return <p className="app-page app-container">{error}</p>
    if (!game) return <p className="app-page app-container">Гру не знайдено</p>

    const freeSpots = game.total_to_rent - game.total_players

    return (
        <div className="details-page app-page app-container">
            <button
                onClick={() => navigate('/games')}
                className="text-zinc-400 text-[18px] mb-4"
            >
                {'< Назад до ігор'}
            </button>

            <div className="details-card">
                <div className="details-card__header">
                    <h3 className="font-bold text-2xl">{game.title}</h3>
                    <div className="details-card__status">
                        <p className="text-white text-sm">Очікується...</p>
                    </div>
                </div>

                <hr className="border-[#596166] -mx-5"/>

                <div className="flex items-center gap-3">
                    <Calendar size={22} strokeWidth={1.8}/>
                    <p className="text-white text-[17px]">{game.date}</p>
                </div>
                <div className="flex items-center gap-3">
                    <MapPin size={22} strokeWidth={1.8}/>
                    <p className="text-white text-[17px]">{game.location}</p>
                </div>
                <div className="flex items-center gap-3">
                    <Users size={22} strokeWidth={1.8}/>
                    <p className="text-white text-[17px]">Вільних місць {freeSpots} з {game.total_to_rent}</p>
                </div>
                <div className="flex items-center gap-3">
                    <LucideClock size={22} strokeWidth={1.8}/>
                    <p className="text-white text-[17px]">Тривалість: {game.duration}</p>
                </div>
            </div>

            <div className="details-actions">
                {game.is_registered ? (
                    <button
                        type="button"
                        onClick={handleCancelRegistration}
                        disabled={actionLoading}
                        className="details-actions__button details-actions__button--danger">
                        {actionLoading ? 'Скасовуємо...' : 'Cкасувати запис'}
                    </button>
                ) : (
                    <button
                        type="button"
                        onClick={() => navigate(`/games/${gameId}/register`)}
                        className="details-actions__button">
                        Записатись на гру
                    </button>
                )}
            </div>

            <div className="players-panel">
                <div>
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className='players-panel__toggle'>
                        <div className="flex items-center gap-3.5">
                            <Users/>
                            <p className='font-medium text-lg'>{game.players.length} Гравців</p>
                        </div>
                        <div>
                            {isOpen ? <ChevronLeft/> : <ChevronDown/>}
                        </div>
                    </button>

                    {isOpen && (
                        <div className='players-panel__body'>
                            <div className='players-panel__heading'>
                                <div className='flex items-center gap-5'>
                                    <p className='text-[#333B45]'>№</p>
                                    <p className='text-[#333B45]'>Нікнейм</p>
                                </div>
                            </div>

                            <div className='players-panel__list'>
                                {game.players.map((player, index) => (
                                    <div key={index} className='players-panel__row'>
                                        <div className='players-panel__row-inner'>
                                            <div className='players-panel__player'>
                                                <div>{String(index + 1).padStart(2, '0')}</div>
                                                <div>
                                                    <p className="truncate text-white text-sm">{player.name}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default GameDetails