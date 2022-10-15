/*=============================================== Login ===============================================*/

import { gql } from "@apollo/client"

const LOGIN = gql`
    mutation login($loginInput: LoginInput) {
        login(loginInput: $loginInput) {
            _id
            fullName
            email
            password
            token
            verified
        }
    }
`

export default LOGIN