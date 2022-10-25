/*=============================================== Type mutation ===============================================*/

import { gql } from "apollo-server"

export const Mutation = gql`
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
