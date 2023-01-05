/*=============================================== Auth context ===============================================*/

import React, { useState, useEffect, createContext } from "react"
import { useQuery } from "@apollo/client"

import { UserType } from "../types"

import { LOGGED_IN_USER } from "./graphql"

export type AuthContextType = {
    isLoggedIn?: boolean
    isLoading?: boolean
    user?: UserType | null
    setUser: (user: null | UserType) => void
    loginUser: (user: UserType) => void
    logoutUser: () => void
    setToken: (token: string) => void
}

export const AuthContext = createContext<UserType | AuthContextType | null>(
    null
)

export const AuthProviderWrapper = ({ children }: Props) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [user, setUser] = useState<UserType | null>(null)
    const [isLoading, setIsLoading] = useState(true)

    const authToken = localStorage.getItem("authToken") || undefined

    const loginUser = (userData: UserType) => {
        localStorage.setItem("authToken", userData.token)
        setIsLoggedIn(true)
        setIsLoading(false)
    }

    const setToken = (token: string) => {
        localStorage.setItem("authToken", token)
        setIsLoggedIn(true)
    }

    const logoutUser = () => {
        localStorage.removeItem("authToken")
        setIsLoggedIn(false)
    }

    const { data, loading } = useQuery(LOGGED_IN_USER, {
        variables: {
            token: authToken,
        },
        skip: !authToken,
    })

    useEffect(() => {
        if (authToken) {
            setUser(data?.loggedInUser)
            setIsLoading(loading)
            setIsLoggedIn(true)
        } else {
            setIsLoggedIn(false)
            setIsLoading(false)
        }
    }, [data, loading, authToken])

    return (
        <AuthContext.Provider
            value={{
                user,
                loginUser,
                logoutUser,
                isLoggedIn,
                setUser,
                isLoading,
                setToken,
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

interface Props {
    children?: any
}
