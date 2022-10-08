/*=============================================== AnonRoutes ===============================================*/

import React, { useContext } from "react"
import { Navigate } from "react-router-dom"
import { PageLoading } from "tsx-library-julseb"

import { AuthContext, AuthContextType } from "../context/auth"

const AnonRoutes = ({ children, redirectTo = "/my-account" }: Props) => {
    const { isLoading, isLoggedIn } = useContext(AuthContext) as AuthContextType

    return isLoading ? (
        <PageLoading />
    ) : !isLoggedIn ? (
        children
    ) : (
        <Navigate to={redirectTo} />
    )
}

export default AnonRoutes

interface Props {
    children?: any
    redirectTo?: string
}
