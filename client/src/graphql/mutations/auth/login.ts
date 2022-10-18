/*=============================================== Login ===============================================*/

import { gql } from "@apollo/client"

const LOGIN = gql`
    mutation login($loginInput: LoginInput) {
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
