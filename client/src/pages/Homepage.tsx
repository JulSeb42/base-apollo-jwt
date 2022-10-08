/*=============================================== Homepage ===============================================*/

import React, { useContext } from "react"
import { Text } from "tsx-library-julseb"
import { useQuery } from "@apollo/client"

import { AuthContext, AuthContextType } from "../context/auth"

import PageLayout from "../components/PageLayout"

import { ALL_USERS } from "../graphql/queries"

const Homepage = () => {
    const { isLoggedIn, user } = useContext(AuthContext) as AuthContextType

    const { data, loading, error } = useQuery(ALL_USERS)

    return (
        <PageLayout title="Homepage">
            <Text tag="h1">Hello World!</Text>

            {isLoggedIn && (
                <Text>Hello {user?.fullName}, you are logged in!</Text>
            )}
        </PageLayout>
    )
}

export default Homepage
