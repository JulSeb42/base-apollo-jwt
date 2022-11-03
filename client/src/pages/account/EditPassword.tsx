/*=============================================== EditPassword ===============================================*/

import React, { useState, useContext } from "react"
import { useMutation } from "@apollo/client"
import { Form, Input, Text } from "tsx-library-julseb"
import { GraphQLErrors } from "@apollo/client/errors"
import { useNavigate } from "react-router-dom"

import { AuthContext, AuthContextType } from "../../context/auth"

import Page from "../../components/layouts/Page"
import ErrorMessages from "../../components/ErrorMessages"

import { EDIT_PASSWORD } from "../../graphql/mutations"

const EditPassword = () => {
    const navigate = useNavigate()

    const { user, setToken, setUser } = useContext(
        AuthContext
    ) as AuthContextType

    const [inputs, setInputs] = useState({
        oldPassword: "",
        newPassword: "",
    })
    const [errorMessages, setErrorMessages] = useState<
        GraphQLErrors | undefined
    >(undefined)

    const handleInputs = (e: React.ChangeEvent<HTMLInputElement>) =>
        setInputs({
            ...inputs,
            [e.target.id]: e.target.value,
        })

    const [editPassword, { loading }] = useMutation(EDIT_PASSWORD)

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        editPassword({
            variables: {
                editPasswordInput: {
                    ...inputs,
                    _id: user?._id,
                },
            },

            onError: ({ graphQLErrors }) => {
                setErrorMessages(graphQLErrors)
            },
        }).then(res => {
            const user = res.data.editPassword
            setToken(user.token)
            setUser(user)
            navigate("/my-account")
        })
    }

    return (
        <Page title="Edit your password" mainWidth="form">
            <Text tag="h1">Edit your password</Text>

            <Form
                buttonPrimary="Save your password"
                buttonSecondary={{ text: "Cancel", to: "/my-account/edit" }}
                onSubmit={handleSubmit}
                isLoading={loading}
            >
                <Input
                    id="oldPassword"
                    label="Your old password"
                    password
                    value={inputs.oldPassword}
                    onChange={handleInputs}
                />

                <Input
                    id="newPassword"
                    label="New password"
                    password
                    value={inputs.newPassword}
                    onChange={handleInputs}
                />
            </Form>

            {errorMessages && <ErrorMessages errors={errorMessages} />}
        </Page>
    )
}

export default EditPassword
