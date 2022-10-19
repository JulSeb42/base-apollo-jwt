/*=============================================== Type definitions ===============================================*/

import { gql } from "apollo-server"

const typeDefs = gql`
    input SignupInput {
        fullName: String!
        email: String!
        password: String!
    }

    input LoginInput {
        email: String!
        password: String!
    }

    input VerifyInput {
        _id: ID!
        verifyToken: String!
    }

    input ForgotInput {
        email: String!
    }

    input ResetInput {
        _id: ID!
        resetToken: String!
        password: String!
    }

    input EditUserInput {
        _id: ID!
        fullName: String
    }

    input EditPasswordInput {
        _id: ID!
        oldPassword: String!
        newPassword: String!
    }

    type User {
        _id: ID!
        fullName: String
        email: String
        password: String
        verified: Boolean
        verifyToken: String
        resetToken: String
        token: String
    }

    type Query {
        users: [User]
        user(_id: ID!): User
    }

    type Mutation {
        signup(signupInput: SignupInput): User!
        verifyUser(verifyInput: VerifyInput): User!
        login(loginInput: LoginInput): User!
        forgotPassword(forgotInput: ForgotInput): User!
        resetPassword(resetInput: ResetInput): User!

        editUser(editUserInput: EditUserInput): User!
        editPassword(editPasswordInput: EditPasswordInput): User!
        deleteUser(_id: ID!): String
    }
`

export default typeDefs
