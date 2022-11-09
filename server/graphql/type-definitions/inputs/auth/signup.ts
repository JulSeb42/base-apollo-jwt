/*=============================================== Signup input ===============================================*/

import { gql } from "apollo-server"

export const SignupInput = gql`
    input SignupInput {
        fullName: String!
        email: String!
        password: String!
    }
`
