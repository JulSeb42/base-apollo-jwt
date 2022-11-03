/*=============================================== ProtectedRoutes ===============================================*/

import React, { useContext } from "react"
import { Navigate } from "react-router-dom"
import { PageLoading } from "tsx-library-julseb"

import { AuthContext, AuthContextType } from "../context/auth"

const ProtectedRoutes = ({ children, redirectTo = "/login" }: Props) => {
    const { isLoading, isLoggedIn } = useContext(AuthContext) as AuthContextType

    return isLoading ? (
        <PageLoading />
    ) : isLoggedIn ? (
        children
    ) : (
        <Navigate to={redirectTo} />
    )
}

export default ProtectedRoutes

interface Props {
    children?: any
    redirectTo?: string
}
