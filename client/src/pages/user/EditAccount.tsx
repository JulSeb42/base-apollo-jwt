/*=============================================== EditAccount ===============================================*/

import React, { useState, useContext } from "react"
import { useMutation } from "@apollo/client"
import { Form, Input, Text, Alert, Utils } from "tsx-library-julseb"
import { GraphQLErrors } from "@apollo/client/errors"
import { useNavigate } from "react-router-dom"

import { AuthContext, AuthContextType } from "../../context/auth"

import PageLayout from "../../components/PageLayout"

import { EDIT_USER } from "../../graphql/mutations"
import { EditPagesTypes } from "../../types"

const EditAccount = ({ edited, setEdited }: EditPagesTypes) => {
    const navigate = useNavigate()
    const { user, setUser, setToken } = useContext(
        AuthContext
    ) as AuthContextType
    const { uuid } = Utils

    const [editUser, { loading }] = useMutation(EDIT_USER)

    const [inputs, setInputs] = useState({
        fullName: user?.fullName,
        id: user?._id,
    })
    const [errorMessages, setErrorMessages] = useState<
        GraphQLErrors | undefined
    >(undefined)

    const handleInputs = (e: React.ChangeEvent<HTMLInputElement>) =>
        setInputs({
            ...inputs,
            [e.target.id]: e.target.value,
        })

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        editUser({
            variables: {
                editUserInput: inputs,
            },

            onError: ({ graphQLErrors }) => {
                setErrorMessages(graphQLErrors)
            },
        }).then(res => {
            setToken(res.data.editUser.token)
            setUser(res.data.editUser)
            setEdited(!edited)
            navigate(-1)
        })
    }

    return (
        <PageLayout title="Edit your account" mainWidth="form">
            <Text tag="h1">Edit your account</Text>

            <Form
                buttonPrimary="Edit your account"
                buttonSecondary={{ text: "Cancel", to: "/my-account" }}
                onSubmit={handleSubmit}
                isLoading={loading}
            >
                <Input
                    id="fullName"
                    label="Full name"
                    value={inputs.fullName}
                    onChange={handleInputs}
                />

                <Input
                    id="email"
                    label="Email"
                    value={user?.email}
                    disabled
                    helperBottom={{
                        text: "You can not edit your email.",
                        style: "italic",
                        color: "gray",
                    }}
                />
            </Form>

            {errorMessages &&
                errorMessages.map(({ message }) => (
                    <Alert color="danger" key={uuid()}>
                        {message}
                    </Alert>
                ))}
        </PageLayout>
    )
}

export default EditAccount
