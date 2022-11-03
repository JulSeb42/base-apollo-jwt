/*=============================================== Login ===============================================*/

import { gql } from "@apollo/client"

export const LOGIN = gql`
    mutation ($loginInput: LoginInput) {
        login(loginInput: $loginInput) {
            _id
            email
            fullName
            password
            verified
            verifyToken
            token
        }
    }
`
