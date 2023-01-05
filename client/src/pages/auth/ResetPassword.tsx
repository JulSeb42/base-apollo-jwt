/*=============================================== ResetPassword ===============================================*/

import React, { useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { useMutation } from "@apollo/client"
import { GraphQLErrors } from "@apollo/client/errors"
import { Form, Input, Text, ComponentProps } from "tsx-library-julseb"
import { passwordRegex } from "../../utils"

import Page from "../../components/layouts/Page"
import ErrorMessages from "../../components/ErrorMessages"

import { RESET_PASSWORD } from "./graphql"

const ResetPassword = () => {
    const navigate = useNavigate()
    const { token, id } = useParams()

    const [password, setPassword] = useState("")
    const [validation, setValidation] =
        useState<ComponentProps.ValidationStatusProps>(undefined)
    const [errorMessages, setErrorMessages] = useState<
        undefined | GraphQLErrors
    >(undefined)

    const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value)

        if (e.target.value.length > 0) {
            if (passwordRegex.test(e.target.value)) {
                setValidation("passed")
            } else {
                setValidation("not-passed")
            }
        } else {
            setValidation(undefined)
        }
    }

    const [resetPassword, { loading }] = useMutation(RESET_PASSWORD)

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const request = {
            resetToken: token,
            _id: id,
            password,
        }

        resetPassword({
            variables: {
                resetInput: request,
            },

            onError: ({ graphQLErrors }) => setErrorMessages(graphQLErrors),
        })
            .then(() => {
                navigate("/login")
            })
            .catch(err => console.log(err))
    }

    return (
        <Page title="Reset your password" mainWidth="form">
            <Text tag="h1">Reset your password</Text>

            <Form
                buttonPrimary="Reset your password"
                onSubmit={handleSubmit}
                isLoading={loading}
            >
                <Input
                    id="password"
                    password
                    label="New password"
                    helperBottom={{
                        text:
                            validation === "not-passed"
                                ? "Password must be at least 6 characters long and must contain at least one number, one lowercase and one uppercase letter."
                                : "",
                        icon:
                            validation === "not-passed"
                                ? "close-circle"
                                : undefined,
                        iconColor: "danger",
                    }}
                    value={password}
                    onChange={handlePassword}
                    validation={{ status: validation }}
                    autoFocus
                />
            </Form>

            {errorMessages && <ErrorMessages errors={errorMessages} />}
        </Page>
    )
}

export default ResetPassword
