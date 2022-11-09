/*=============================================== User mutation ===============================================*/

import { gql } from "apollo-server"

export const MutationUser = gql`
    type Mutation {
        editUser(editUserInput: EditUserInput): User!
        editPassword(editPasswordInput: EditPasswordInput): User!
        deleteUser(_id: ID!): String
    }
`
