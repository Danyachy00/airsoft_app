import {Calendar, DollarSign, MapPin, Users} from 'lucide-react'
import {useNavigate} from 'react-router-dom'

const GameCard = ({game}) => {
    const navigate = useNavigate()

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

            <div className='flex gap-2'>
                <DollarSign size={26} strokeWidth={1}/>
                <p>{game.price}</p>
            </div>

            <div className='game-card__footer'>
                <div className='flex gap-2'>
                    <Users size={26} strokeWidth={1}/>
                    <p>{game.freeSpots} з {game.totalSpots}</p>
                </div>

                <span className='underline underline-offset-6'>Детальніше</span>
            </div>
        </button>
    )
}

export default GameCard
