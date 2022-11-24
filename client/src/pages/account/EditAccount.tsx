/*=============================================== EditAccount ===============================================*/

import React, { useState, useContext } from "react"
import { useMutation } from "@apollo/client"
import { Form, Input, Text } from "tsx-library-julseb"
import { GraphQLErrors } from "@apollo/client/errors"
import { useNavigate, Link } from "react-router-dom"

import { AuthContext, AuthContextType } from "../../context/auth"

import Page from "../../components/layouts/Page"
import ErrorMessages from "../../components/ErrorMessages"
import DangerZone from "../../components/DangerZone"
import ImageUploader from "../../components/ImageUploader"

import { EDIT_USER, DELETE_USER } from "../../graphql/mutations"

const EditAccount = () => {
    const navigate = useNavigate()
    const {
        user,
        setUser,
        setToken,
        logoutUser,
        isLoading: isApiLoading,
    } = useContext(AuthContext) as AuthContextType

    const [editUser, { loading }] = useMutation(EDIT_USER)

    const [inputs, setInputs] = useState({
        fullName: !isApiLoading ? user?.fullName : "",
        _id: !isApiLoading ? user?._id : "",
    })
    const [avatar, setAvatar] = useState(
        !isApiLoading ? user?.avatar : user ? user?.avatar : ""
    )
    const [isLoading, setIsLoading] = useState(false)
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

        const request = {
            ...inputs,
            _id: user?._id,
            avatar,
        }

        if (user) {
            editUser({
                variables: {
                    editUserInput: {
                        ...request,
                    },
                },

                onError: ({ graphQLErrors }) => {
                    setErrorMessages(graphQLErrors)
                },
            }).then(res => {
                const user = res.data.editUser
                setToken(user.token)
                setUser(user)
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
                    setErrorMessages(graphQLErrors)
                },
            }).then(() => {
                logoutUser()
                navigate("/goodbye")
            })
        } else {
            console.log("No ID")
        }
    }

    return (
        <Page
            title="Edit your account"
            mainWidth="form"
            isLoading={loading || isApiLoading}
        >
            <Text tag="h1">Edit your account</Text>

            <Form
                buttonPrimary="Edit your account"
                buttonSecondary={{ text: "Cancel", to: "/my-account" }}
                onSubmit={handleSubmit}
                isLoading={loading || isApiLoading || isLoading || !user?._id}
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

                <ImageUploader
                    id="avatar"
                    imageUrl={avatar || ""}
                    setImageUrl={setAvatar}
                    setIsLoading={setIsLoading}
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
