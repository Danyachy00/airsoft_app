import { BrowserRouter, Routes, Route } from 'react-router-dom'
import {useState} from 'react'
import './App.css'
import HomePage from './components/HomePage'
import Preload from "./components/Preload.jsx";
import GameDetails from "./components/GameDetails.jsx"
import Register from "./components/Register.jsx";
import Profile from "./components/Profile.jsx";
import {games as initialGames} from "./data/data.js";


export default function App() {
    const [games, setGames] = useState(initialGames)

    const cancelRegistration = (gameId) => {
        setGames(currentGames =>
            currentGames.map(game =>
                game.id === gameId
                    ? {...game, isRegistered: false}
                    : game
            )
        )
    }

    const confirmRegistration = (gameId) => {
        setGames(currentGames =>
            currentGames.map(game =>
                game.id === gameId
                    ? {...game, isRegistered: true}
                    : game
            )
        )
    }

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Preload/>} />
                <Route path="/games" element={<HomePage games={games} />} />
                <Route
                    path="/games/:id"
                    element={<GameDetails games={games} onCancelRegistration={cancelRegistration}/>}
                />
                <Route
                    path="/games/:id/register"
                    element={<Register onConfirmRegistration={confirmRegistration}/>}
                />
                <Route path="/games/register" element={<Register onConfirmRegistration={confirmRegistration}/>}/>
                <Route path="/profile" element={<Profile games={games}/>}/>
            </Routes>
        </BrowserRouter>
    )
}
