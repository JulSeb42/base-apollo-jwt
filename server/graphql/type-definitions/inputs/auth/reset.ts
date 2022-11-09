/*=============================================== Reset input ===============================================*/

import { gql } from "apollo-server"

export const ResetInput = gql`
    input ResetInput {
        _id: ID!
        resetToken: String!
        password: String!
    }
`
