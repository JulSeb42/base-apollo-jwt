/*=============================================== MyAccount ===============================================*/

import React, { useContext } from "react"
import { PageLoading, Text } from "tsx-library-julseb"
import { Link } from "react-router-dom"

import { AuthContext, AuthContextType } from "../../context/auth"

import PageLayout from "../../components/PageLayout"
import ErrorPage from "../../components/ErrorPage"

const MyAccount = () => {
    const { user, isLoading, error } = useContext(
        AuthContext
    ) as AuthContextType

    if (isLoading) return <PageLoading />
    if (error) return <ErrorPage error={error[0].message} />

    return user ? (
        <PageLayout title={user.fullName}>
            <Text tag="h1">Hello {user.fullName}</Text>

            <Text>
                <Link to="/my-account/edit">Edit your account.</Link>
            </Text>
        </PageLayout>
    ) : (
        <Text>An error occured</Text>
    )
}

export default MyAccount
