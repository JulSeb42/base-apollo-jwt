/*=============================================== Signup ===============================================*/

import { gql } from "@apollo/client"

export const SIGNUP = gql`
    mutation ($signupInput: SignupInput) {
        signup(signupInput: $signupInput) {
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
