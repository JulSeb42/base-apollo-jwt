/*=============================================== EditAccount ===============================================*/

import React, { useState, useContext } from "react"
import { useMutation } from "@apollo/client"
import { Form, Input, Text, PageLoading } from "tsx-library-julseb"
import { GraphQLErrors } from "@apollo/client/errors"
import { useNavigate, Link } from "react-router-dom"

import { AuthContext, AuthContextType } from "../../context/auth"

import Page from "../../components/layouts/Page"
import ErrorPage from "../../components/layouts/ErrorPage"
import ErrorMessages from "../../components/ErrorMessages"
import DangerZone from "../../components/DangerZone"

import { EDIT_USER, DELETE_USER } from "../../graphql/mutations"
import { EditPagesTypes } from "../../types"

const EditAccount = ({ edited, setEdited }: EditPagesTypes) => {
    const navigate = useNavigate()
    const { user, setUser, setToken, logoutUser, isLoading, error } =
        useContext(AuthContext) as AuthContextType

    const [editUser, { loading }] = useMutation(EDIT_USER)

    const [inputs, setInputs] = useState({
        fullName: !isLoading ? user?.fullName : "",
        _id: !isLoading ? user?._id : "",
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

        if (user) {
            editUser({
                variables: {
                    editUserInput: {
                        ...inputs,
                        _id: user._id,
                    },
                },

                onError: ({ graphQLErrors }) => {
                    setErrorMessages(graphQLErrors)
                },
            }).then(res => {
                const user = res.data.editUser
                setToken(user.token)
                setUser(user)
                setEdited(!edited)
                navigate("/my-account")
            })
        }
    }

    const [deleteUser, { loading: deleteLoading }] = useMutation(DELETE_USER)

    const handleDelete = () => {
        if (user) {
            deleteUser({
                variables: {
                    _id: user._id,
                },

                onError: ({ graphQLErrors }) => {
                    console.log(graphQLErrors[0])
                },
            }).then(() => {
                logoutUser()
                navigate("/login")
            })
        } else {
            console.log("No ID")
        }
    }

    if (isLoading) return <PageLoading />
    if (error) return <ErrorPage error={error[0].message} />

    return (
        <Page title="Edit your account" mainWidth="form">
            <Text tag="h1">Edit your account</Text>

            <Form
                buttonPrimary="Edit your account"
                buttonSecondary={{ text: "Cancel", to: "/my-account" }}
                onSubmit={handleSubmit}
                isLoading={loading || isLoading || !user?._id}
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

            {errorMessages && <ErrorMessages errors={errorMessages} />}

            <Text>
                <Link to="/my-account/edit-password">Edit your password.</Link>
            </Text>

            <DangerZone
                texts={{
                    buttonOpen: "Delete account",
                    body: "Are you sure you want to delete your account?",
                    buttonSecondary: "No, cancel",
                }}
                buttonPrimary={{
                    text: "Yes, delete my account",
                    onClick: handleDelete,
                    isLoading: deleteLoading,
                }}
            />
        </Page>
    )
}

export default EditAccount
