/*=============================================== MyAccount ===============================================*/

import React, { useContext } from "react"
import { PageLoading, Text } from "tsx-library-julseb"
import { Link } from "react-router-dom"

import { AuthContext, AuthContextType } from "../../context/auth"

import Page from "../../components/layouts/Page"

const MyAccount = () => {
    const { user, isLoading } = useContext(AuthContext) as AuthContextType

    if (isLoading) return <PageLoading />

    return user ? (
        <Page title={user.fullName}>
            <Text tag="h1">Hello {user.fullName}</Text>

            {!user.verified && <Text>Your account is not verified.</Text>}

            <Text>
                <Link to="/my-account/edit">Edit your account.</Link>
            </Text>
        </Page>
    ) : (
        <Text>User not found.</Text>
    )
}

export default MyAccount
