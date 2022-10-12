/*=============================================== Homepage ===============================================*/

import React, { useContext } from "react"
import { Text } from "tsx-library-julseb"

import { AuthContext, AuthContextType } from "../context/auth"

import Page from "../components/layouts/Page"

const Homepage = () => {
    const { isLoggedIn, user } = useContext(AuthContext) as AuthContextType

    return (
        <Page title="Homepage">
            <Text tag="h1">Hello World!</Text>

            {isLoggedIn && (
                <Text>Hello {user?.fullName}, you are logged in!</Text>
            )}
        </Page>
    )
}

export default Homepage
