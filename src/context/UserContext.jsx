import { useState } from 'react'
import { UserContext } from './userContextValue.js'
import { getStoredUser } from '../helpers/auth.js'

export function UserProvider({ children }) {
    const [user, setUser] = useState(getStoredUser)

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    )
}
