/*=============================================== Signup ===============================================*/

import React, { useState, useContext } from "react"
import { Text, Form, Input, Alert, Utils } from "tsx-library-julseb"
import { Link, useNavigate } from "react-router-dom"
import { useMutation } from "@apollo/client"
import { GraphQLErrors } from "@apollo/client/errors"

import { AuthContext, AuthContextType } from "../../context/auth"

import PageLayout from "../../components/PageLayout"

import { SIGNUP } from "../../graphql/mutations"

const Signup = () => {
    const navigate = useNavigate()
    const { loginUser } = useContext(AuthContext) as AuthContextType
    const { uuid } = Utils

    const [signup, { loading }] = useMutation(SIGNUP)

    const [inputs, setInputs] = useState({
        fullName: "Julien Sebag",
        email: "a@b.com",
        password: "Password42",
    })
    const [errorMessages, setErrorMessages] = useState<
        undefined | GraphQLErrors
    >(undefined)

    const handleInputs = (e: React.ChangeEvent<HTMLInputElement>) =>
        setInputs({
            ...inputs,
            [e.target.id]: e.target.value,
        })

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        signup({
            variables: {
                signupInput: inputs,
            },

            onError: ({ graphQLErrors }) => {
                setErrorMessages(graphQLErrors)
            },
        })
            .then(res => {
                loginUser(res.data.signup)
                navigate(-1)
            })
            .catch(err => console.log(err))
    }

    return (
        <PageLayout title="Create an account" mainWidth="form">
            <Text tag="h1">Create an account</Text>

            <Form
                buttonPrimary="Create a new account"
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
                    value={inputs.email}
                    onChange={handleInputs}
                    type="email"
                />

                <Input
                    id="password"
                    label="Password"
                    value={inputs.password}
                    onChange={handleInputs}
                    password
                />
            </Form>

            {errorMessages &&
                errorMessages.map(({ message }) => (
                    <Alert color="danger" key={uuid()}>
                        {message}
                    </Alert>
                ))}

            <Text>
                You already have an account? <Link to="/login">Log in</Link>.
            </Text>
        </PageLayout>
    )
}

export default Signup
