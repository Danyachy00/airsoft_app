import { Navigate } from 'react-router-dom'
import { useUser } from '../context/useUser.js'
import { isAdmin } from '../helpers/auth.js'

// Тільки для UI. Справжній захист - перевірка ролі на беку (403).
const AdminRoute = ({ children }) => {
    const { user } = useUser()

    if (!isAdmin(user)) {
        return <Navigate to="/games" replace />
    }

    return children
}

export default AdminRoute
