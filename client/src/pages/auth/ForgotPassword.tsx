/*=============================================== ForgotPassword ===============================================*/

import React, { useState } from "react"
import { Text, Form, Input } from "tsx-library-julseb"
import { useMutation } from "@apollo/client"
import { GraphQLErrors } from "@apollo/client/errors"
import { useNavigate } from "react-router-dom"

import Page from "../../components/layouts/Page"
import ErrorMessages from "../../components/ErrorMessages"

import { FORGOT_PASSWORD } from "../../graphql/mutations"

const ForgotPassword = () => {
    const navigate = useNavigate()

    const [email, setEmail] = useState("")
    const [errorMessages, setErrorMessages] = useState<
        undefined | GraphQLErrors
    >(undefined)

    const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) =>
        setEmail(e.target.value)

    const [forgotPassword, { loading }] = useMutation(FORGOT_PASSWORD)

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        forgotPassword({
            variables: {
                forgotInput: {
                    email,
                },
            },

            onError: ({ graphQLErrors }) => setErrorMessages(graphQLErrors),
        }).then(() => {
            navigate("/login/forgot-password/email-sent")
        })
    }

    return (
        <Page title="I forgot my password" mainWidth="form">
            <Text tag="h1">I forgot my password</Text>

            <Text>
                Please enter your email address, we will send you a link to
                reset your password.
            </Text>

            <Form
                buttonPrimary="Send"
                buttonSecondary={{ text: "Cancel", to: "/login" }}
                onSubmit={handleSubmit}
                isLoading={loading}
            >
                <Input
                    label="Your email"
                    id="email"
                    type="email"
                    autoFocus
                    value={email}
                    onChange={handleEmail}
                />
            </Form>

            {errorMessages && <ErrorMessages errors={errorMessages} />}
        </Page>
    )
}

export default ForgotPassword
