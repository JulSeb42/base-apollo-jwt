/*=============================================== Login ===============================================*/

import { gql } from "@apollo/client"

const LOGIN = gql`
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

export { LOGIN }
