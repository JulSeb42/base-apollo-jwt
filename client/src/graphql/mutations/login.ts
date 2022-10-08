/*=============================================== Login ===============================================*/

import { gql } from "@apollo/client"

const LOGIN = gql`
    mutation login($loginInput: LoginInput) {
        login(loginInput: $loginInput) {
            id
            fullName
            email
            password
            token
        }
    }
`

export default LOGIN