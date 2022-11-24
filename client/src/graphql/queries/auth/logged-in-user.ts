/*=============================================== Get user by token ===============================================*/

import { gql } from "@apollo/client"

export const LOGGED_IN_USER = gql`
    query ($token: String!) {
        loggedInUser(token: $token) {
            _id
            email
            fullName
            password
            verified
            verifyToken
            token
            avatar
        }
    }
`
