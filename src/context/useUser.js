import { useContext } from 'react'
import { UserContext } from './userContextValue.js'

export function useUser() {
    return useContext(UserContext)
}
