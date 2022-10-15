/*=============================================== ErrorMessages ===============================================*/

import React from "react"
import { GraphQLErrors } from "@apollo/client/errors"
import { Alert } from "tsx-library-julseb"
import { uuid } from "../utils"

const ErrorMessages = ({ errors }: Props) => {
    return (
        <>
            {errors.map(({ message }) => (
                <Alert color="danger" key={uuid()}>
                    {message}
                </Alert>
            ))}
        </>
    )
}

export default ErrorMessages

interface Props {
    errors: GraphQLErrors
}
