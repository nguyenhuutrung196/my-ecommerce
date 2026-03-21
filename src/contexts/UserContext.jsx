import Cookies from 'js-cookie'
import { createContext, useEffect, useState } from 'react'
import { toast } from 'react-toastify'

export const UserContext = createContext(null)

export const UserProvider = ({ children }) => {
    const [userInfo, setUserInfo] = useState(null)

    useEffect(() => {
        const token = Cookies.get('access_token')
        if (token) setUserInfo({ username: 'mor_2314' })
    }, [])

    const handleLogout = () => {
        setUserInfo(null)
        Cookies.remove('access_token')
        toast.success('Logout successfully')
    }

    return (
        <UserContext.Provider value={{ userInfo, setUserInfo, handleLogout }}>
            {children}
        </UserContext.Provider>
    )
}
