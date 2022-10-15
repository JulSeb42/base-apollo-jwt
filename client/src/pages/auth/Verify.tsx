/*=============================================== Verify ===============================================*/

import React, { useContext, useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { useMutation } from "@apollo/client"
import { Text, PageLoading } from "tsx-library-julseb"

import { AuthContext, AuthContextType } from "../../context/auth"

import Page from "../../components/layouts/Page"

import { VERIFY_USER } from "../../graphql/mutations"

const Verify = () => {
    const { id, token } = useParams()
    const { isLoggedIn, user, isLoading } = useContext(
        AuthContext
    ) as AuthContextType

    const [isVerified, setIsVerified] = useState(user?.verified)

    const [verifyUser, { loading }] = useMutation(VERIFY_USER)

    useEffect(() => {
        const request = {
            _id: id,
            verifyToken: token,
        }

        verifyUser({
            variables: {
                
            }
        })
    }, [])

    return isLoading ? (
        <PageLoading />
    ) : (
        <Page title="Verify your account">
            {isLoggedIn && isVerified ? (
                <></>
            ) : isLoggedIn && !isVerified ? (
                <>
                    <Text tag="h1">Verification failed</Text>
                    <Text>
                        Your account could not be verified, please try again
                        later.
                    </Text>
                </>
            ) : (
                <>
                    <Text tag="h1">You are not logged in!</Text>
                    <Text>Please log in to verify your account.</Text>
                </>
            )}
        </Page>
    )
}

export default Verify
