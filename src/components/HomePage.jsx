import '/src/App.css'
import {currentUser} from "../data/data.js";
import GameCard from "./GameCard.jsx";
import BottomNav from "./BottomNav.jsx";

const HomePage = ({games}) => {
    return (
        <div className="home-page app-page min-h-screen">
            <div className='home-header app-container'>
                <h3 className='font-semibold text-2xl'>Гравець</h3>
                <h1 className='font-bold text-3xl '>{currentUser.username}</h1>
            </div>

            <div className="game-list app-container">
                {games.map(game => (
                    <GameCard key={game.id} game={game} />
                ))}
            </div>

            <BottomNav/>
        </div>
    )
}

export default HomePage
