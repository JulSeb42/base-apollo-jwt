/*=============================================== Type definitions ===============================================*/

import { gql } from "apollo-server"

const typeDefs = gql`
    input SignupInput {
        fullName: String!
        email: String!
        password: String!
        token: String
    }

    input VerifyInput {
        _id: ID!
        verifyToken: String!
    }

    input LoginInput {
        email: String!
        password: String!
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
        fullName: String
        email: String
        password: String
        token: String
        _id: ID
        verified: Boolean
        verifyToken: String
        resetToken: String
    }

    type Query {
        getUser(_id: ID!): User
        allUsers: [User]
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
