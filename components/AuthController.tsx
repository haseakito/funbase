'use client'

import React, {
    ReactNode,
    createContext,
    useContext,
    useState,
    useEffect
} from 'react'
import { useRouter } from 'next/navigation'

type AuthContextProps = {
    token: string
}

// Context handling the user auth state
export const AuthContext = createContext<AuthContextProps>({ token: '' })

// Hooks handling the AuthContext
export const useAuthContext = () => useContext(AuthContext)

export function AuthController({ children }: { children: ReactNode }) {

    // Boolean state handling if the user is logged in or not
    const [ token, setToken ] = useState('')

    // Hooks handling the router
    const router = useRouter()

    // Side effect handling getting the token
    useEffect(() => {
        const token =  window.localStorage.getItem('token')

        // if (!token) {
        //     router.push('/')
        // }
        // else {
        //     // Set the verified to be true
        //     setToken(token)
        // }
    }, [])

  return (
    <AuthContext.Provider value={{ token }}>
        { children }
    </AuthContext.Provider>
  )
}
