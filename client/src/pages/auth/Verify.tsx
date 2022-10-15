/*=============================================== Verify ===============================================*/

import React, { useContext, useState } from "react"
import { useParams, Link } from "react-router-dom"
import { useMutation } from "@apollo/client"
import { GraphQLErrors } from "@apollo/client/errors"
import { Text, PageLoading, Alert, Utils } from "tsx-library-julseb"

import { AuthContext, AuthContextType } from "../../context/auth"

import Page from "../../components/layouts/Page"

import { VERIFY_USER } from "../../graphql/mutations"

const Verify = () => {
    const { id, token } = useParams()
    const { isLoggedIn, user } = useContext(AuthContext) as AuthContextType
    const { uuid } = Utils

    const [isLoading, setIsLoading] = useState(true)
    const [isVerified, setIsVerified] = useState(user?.verified)
    const [errorMessages, setErrorMessages] = useState<
        undefined | GraphQLErrors
    >(undefined)

    const [verifyUser] = useMutation(VERIFY_USER)

    const verifyFunc = () => {
        if (
            isLoggedIn &&
            user &&
            user._id === id &&
            user.verifyToken === token
        ) {
            const request = {
                _id: id,
                verifyToken: token,
            }
            verifyUser({
                variables: {
                    verifyInput: request,
                },
                onError: ({ graphQLErrors }) => {
                    setErrorMessages(graphQLErrors)
                },
            }).then(() => {
                setIsVerified(true)
                setIsLoading(false)
            })
        }
    }

    setTimeout(() => {
        verifyFunc()
    }, 1000)

    return isLoading ? (
        <PageLoading />
    ) : (
        <Page title="Verify your account">
            {isLoggedIn && isVerified ? (
                <>
                    <Text tag="h1">Your account is verifed!</Text>
                    <Text>
                        You can now access all the functionalities on our
                        website.{" "}
                        <Link to="/my-account">Go to your account</Link>.
                    </Text>
                </>
            ) : isLoggedIn && !isVerified ? (
                <>
                    <Text tag="h1">Verification failed</Text>
                    <Text>
                        Your account could not be verified, please try again
                        later.
                    </Text>

                    {errorMessages &&
                        errorMessages.map(({ message }) => (
                            <Alert color="danger" key={uuid()}>
                                {message}
                            </Alert>
                        ))}
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