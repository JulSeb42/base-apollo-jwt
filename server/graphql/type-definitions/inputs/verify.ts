/*=============================================== Verify input ===============================================*/

import { gql } from "apollo-server"

export const VerifyInput = gql`
    input VerifyInput {
        _id: ID!
        verifyToken: String!
    }
`
