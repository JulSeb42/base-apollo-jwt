/*=============================================== User ===============================================*/

import { gql } from "apollo-server"

export const User = gql`
    type User {
        _id: ID!
        fullName: String
        email: String
        password: String
        verified: Boolean
        verifyToken: String
        resetToken: String
        token: String
        avatar: String
    }
`
