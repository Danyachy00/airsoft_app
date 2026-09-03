import {Calendar, MapPin, Users} from 'lucide-react'
import {useNavigate} from 'react-router-dom'

const GameCard = ({game}) => {
    const navigate = useNavigate()
    const freeSpots = game.total_to_rent - game.total_players

    return (
        <button
            type="button"
            onClick={() => navigate(`/games/${game.id}`)}
            className="game-card"
        >
            <h3 className='font-medium text-lg p-0.5'>{game.title}</h3>

            <div className='flex gap-2'>
                <Calendar size={26} strokeWidth={1}/>
                <p>{game.date}</p>
            </div>

            <div className='flex gap-2'>
                <MapPin size={26} strokeWidth={1}/>
                <p>{game.location}</p>
            </div>

            <div className='game-card__footer'>
                <div className='flex gap-2'>
                    <Users size={26} strokeWidth={1}/>
                    <p>{freeSpots} з {game.total_to_rent}</p>
                </div>

                <span className='underline underline-offset-6'>Детальніше</span>
            </div>
        </button>
    )
}

export default GameCard