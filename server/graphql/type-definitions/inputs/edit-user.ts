/*=============================================== Edit user input ===============================================*/

import { gql } from "apollo-server"

export const EditUserInput = gql`
    input EditUserInput {
        _id: ID!
        fullName: String
    }
`
