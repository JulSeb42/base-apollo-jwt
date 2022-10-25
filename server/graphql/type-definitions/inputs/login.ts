/*=============================================== Login input ===============================================*/

import { gql } from "apollo-server"

export const LoginInput = gql`
    input LoginInput {
        email: String!
        password: String!
    }
`
