import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import HomePage from './components/HomePage'
import Preload from "./components/Preload.jsx"
import GameDetails from "./components/GameDetails.jsx"
import Register from "./components/Register.jsx"
import Profile from "./components/Profile.jsx"
import AdminRoute from "./components/AdminRoute.jsx"
import AdminGames from "./components/AdminGames.jsx"
import AdminGameForm from "./components/AdminGameForm.jsx"
import { UserProvider } from './context/UserContext.jsx'

export default function App() {
    return (
        <UserProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Preload/>} />
                    <Route path="/games" element={<HomePage />} />
                    <Route path="/games/:id" element={<GameDetails />} />
                    <Route path="/games/:id/register" element={<Register />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/admin" element={<AdminRoute><AdminGames /></AdminRoute>} />
                    <Route path="/admin/games/new" element={<AdminRoute><AdminGameForm /></AdminRoute>} />
                    <Route path="/admin/games/:id/edit" element={<AdminRoute><AdminGameForm /></AdminRoute>} />
                </Routes>
            </BrowserRouter>
        </UserProvider>
    )
}
