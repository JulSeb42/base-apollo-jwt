/*=============================================== Verify user ===============================================*/

import { gql } from "@apollo/client"

const VERIFY_USER = gql`
    mutation verifyUser($verifyInput: VerifyInput) {
        verifyUser(verifyInput: $verifyInput) {
            _id
            fullName
            email
            password
            token
        }
    }
`

export default VERIFY_USER
