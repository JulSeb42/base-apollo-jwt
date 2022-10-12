/*=============================================== Auth context ===============================================*/

import React, { useState, useEffect, useReducer, createContext } from "react"
import jwtDecode from "jwt-decode"
import { GraphQLErrors } from "@apollo/client/errors"

import { UserType } from "../types"

const initialState: EmptyUser = {
    user: null,
}

const authToken = localStorage.getItem("authToken") || undefined

if (authToken) {
    const decodedToken: any = jwtDecode(authToken)

    if (decodedToken.exp * 1000 < Date.now()) {
        localStorage.removeItem("authToken")
    } else {
        initialState.user = decodedToken
    }
}

const AuthContext = createContext<UserType | EmptyUser>({
    user: null,
    isLoggedIn: false,
    loginUser: (userData: UserType) => {},
    logoutUser: () => {},
    setToken: (token: string) => {},
})

const authReducer = (state: any, action: any) => {
    switch (action.type) {
        case "LOGIN":
            return {
                ...state,
                user: action.payload,
            }
        case "LOGOUT":
            return {
                ...state,
                user: null,
            }
        default:
            return state
    }
}

const AuthProviderWrapper = ({ children }: Props) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [user, setUser] = useState<UserType | null>(null)
    const [isLoading, setIsLoading] = useState(true)

    const [state, dispatch] = useReducer(authReducer, initialState)

    const loginUser = (userData: UserType) => {
        localStorage.setItem("authToken", userData.token)
        setIsLoggedIn(true)
        setIsLoading(false)
        dispatch({
            type: "LOGIN",
            payload: userData,
        })
    }

    const setToken = (token: string) => {
        localStorage.setItem("authToken", token)
        setIsLoggedIn(true)
    }

    const logoutUser = () => {
        localStorage.removeItem("authToken")
        dispatch({ type: "LOGOUT" })
    }

    useEffect(() => {
        const storedToken = localStorage.getItem("authToken")

        if (storedToken) {
            setIsLoggedIn(true)
            setUser(state.user)
            setIsLoading(false)
        } else {
            setIsLoggedIn(false)
            setIsLoading(false)
        }
    }, [state.user])

    const value = {
        user,
        loginUser,
        logoutUser,
        isLoggedIn,
        setUser,
        isLoading,
        setToken,
    }

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export { AuthProviderWrapper, AuthContext }

interface Props {
    children?: any
}

type EmptyUser = {
    user?: null | {
        exp?: string | number
    }
    loginUser?: any
    logoutUser?: () => void
    setUser?: (user: null | UserType) => void
    isLoggedIn?: boolean
    setToken?: (token: string) => void
}

export type AuthContextType = {
    isLoggedIn?: boolean
    isLoading?: boolean
    user?: UserType | null
    setUser: (user: null | UserType) => void
    // setUser: any
    loginUser: (user: UserType) => void
    logoutUser: () => void
    setToken: (token: string) => void
    error?: GraphQLErrors
}
