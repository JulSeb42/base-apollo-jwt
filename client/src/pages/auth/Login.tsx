/*=============================================== Login ===============================================*/

import React, { useState, useContext } from "react"
import { Text, Form, Input } from "tsx-library-julseb"
import { Link, useNavigate } from "react-router-dom"
import { useMutation } from "@apollo/client"
import { GraphQLErrors } from "@apollo/client/errors"

import { AuthContext, AuthContextType } from "../../context/auth"

import Page from "../../components/layouts/Page"
import ErrorMessages from "../../components/ErrorMessages"

import { LOGIN } from "../../graphql/mutations"

const Login = () => {
    const navigate = useNavigate()
    const { loginUser } = useContext(AuthContext) as AuthContextType

    const [login, { loading }] = useMutation(LOGIN)

    const [inputs, setInputs] = useState({
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

        login({
            variables: {
                loginInput: inputs,
            },

            onError: ({ graphQLErrors }) => {
                setErrorMessages(graphQLErrors)
            },
        }).then(res => {
            loginUser(res.data.login)
            navigate(-1)
        })
    }

    return (
        <Page title="Login" mainWidth="form">
            <Text tag="h1">Log in</Text>

            <Form
                buttonPrimary="Log in"
                onSubmit={handleSubmit}
                isLoading={loading}
            >
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

            {errorMessages && <ErrorMessages errors={errorMessages} />}

            <Text>
                <Link to="/login/forgot-password">I forgot my password.</Link>
            </Text>

            <Text>
                You don't have an account? <Link to="/signup">Sign up</Link>.
            </Text>
        </Page>
    )
}

export default Login
