import {useNavigate, useParams,} from 'react-router-dom'
import {useState} from 'react'
import {Calendar, DollarSign, MapPin, Users, LucideClock, ChevronDown, ChevronLeft} from "lucide-react";

const GameDetails = ({games, onCancelRegistration}) => {
    const navigate = useNavigate()
    const {id} = useParams()
    const gameId = Number(id)
    const game = games.find(game => game.id === gameId)
    const [isOpen, setIsOpen] = useState(false)
    const isRegistered = game?.isRegistered ?? false

    const cancelRegistration = () => {
        onCancelRegistration(gameId)
    }


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
                    <DollarSign size={22} strokeWidth={1.8}/>
                    <p className="text-white text-[17px]">Вартість участі {game.price} гривень</p>
                </div>
                <div className="flex items-center gap-3">
                    <Users size={22} strokeWidth={1.8}/>
                    <p className="text-white text-[17px]">Вільних місць {game.freeSpots} з {game.totalSpots}</p>
                </div>
                <div className="flex items-center gap-3">
                    <LucideClock size={22} strokeWidth={1.8}/>
                    <p className="text-white text-[17px]">Тривалість: {game.duration}</p>
                </div>

            </div>

            <div className="details-actions">
                {isRegistered ? (
                    <button
                        type="button"
                        onClick={cancelRegistration}
                        className="details-actions__button details-actions__button--danger">
                        Cкасувати запис
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
                        <div className="flex items-center gap-3.5   ">
                            <Users/>
                            <p className='font-medium text-lg'>{game.players.length} Гравців</p>
                        </div>
                        <div>
                            {isOpen ? (
                                <ChevronLeft/>
                            ) : (
                                <ChevronDown/>
                            )}
                        </div>
                    </button>

                    {isOpen && (
                        <div className='players-panel__body'>
                            <div className='players-panel__heading'>
                                <div className='flex items-center gap-5'>
                                    <p className='text-[#333B45]'>№</p>
                                    <p className='text-[#333B45]'>Нікнейм</p>
                                </div>
                                <div className=''>
                                    <p className='text-[#333B45]'>Статус</p>
                                </div>
                            </div>

                            <div className='players-panel__list'>
                                {game.players.map((player, index) => (
                                    <div key={player.id} className='players-panel__row'>
                                        <div className='players-panel__row-inner'>
                                            <div className='players-panel__player'>
                                                <div >
                                                    {String(index + 1).padStart(2, '0')}
                                                </div>
                                                <div >
                                                    <p className="truncate text-white text-sm">{player.nickname}</p>
                                                    <p className="text-zinc-500 text-xs">{player.handle}</p>
                                                </div>
                                            </div>

                                            <div className={`players-panel__status-dot ${player.paid ? ' border-[#1A6633] border-2 bg-green-500' : 'border-[#98783C] border-2 bg-yellow-500'}`} />

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
