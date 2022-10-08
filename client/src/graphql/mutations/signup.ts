/*=============================================== Signup ===============================================*/

import { gql } from "@apollo/client"

const SIGNUP = gql`
    mutation signup($signupInput: SignupInput) {
        signup(signupInput: $signupInput) {
            id
            fullName
            email
            password
            token
        }
    }
`

export default SIGNUP
