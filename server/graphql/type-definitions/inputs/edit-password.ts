/*=============================================== Edit password input ===============================================*/

import { gql } from "apollo-server"

export const EditPasswordInput = gql`
    input EditPasswordInput {
        _id: ID!
        oldPassword: String!
        newPassword: String!
    }
`
