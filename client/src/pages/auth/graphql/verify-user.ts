/*=============================================== Verify user ===============================================*/

import { gql } from "@apollo/client"

export const VERIFY_USER = gql`
    mutation verifyUser($verifyInput: VerifyInput) {
        verifyUser(verifyInput: $verifyInput) {
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
