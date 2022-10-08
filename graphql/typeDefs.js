/*=============================================== Type defs ===============================================*/

const { gql } = require("apollo-server")

const typeDefs = gql`
    type User {
        fullName: String
        email: String
        password: String
        token: String
        id: ID
    }

    input SignupInput {
        fullName: String
        email: String
        password: String
        token: String
    }

    input LoginInput {
        email: String
        password: String
    }

    input EditUserInput {
        id: ID!
        fullName: String
    }

    type Query {
        getUser(id: ID!): User
        allUsers: [User]
    }

    type Mutation {
        signup(signupInput: SignupInput): User
        login(loginInput: LoginInput): User
        editUser(editUserInput: EditUserInput): User
        deleteUser(id: ID): String
    }
`

module.exports = typeDefs
