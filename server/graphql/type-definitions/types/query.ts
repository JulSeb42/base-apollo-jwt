/*=============================================== Type query ===============================================*/

import { gql } from "apollo-server"

export const Query = gql`
    type Query {
        users: [User]
        user(_id: ID!): User
        loggedInUser(token: String!): User!
    }
`
