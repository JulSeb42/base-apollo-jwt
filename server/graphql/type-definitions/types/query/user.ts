/*=============================================== User query ===============================================*/

import { gql } from "apollo-server"

export const QueryUser = gql`
    type Query {
        users: [User]
        user(_id: ID!): User
        loggedInUser(token: String!): User!
    }
`
