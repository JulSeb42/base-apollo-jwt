/*=============================================== Auth mutation ===============================================*/

import { gql } from "apollo-server"

export const MutationAuth = gql`
    type Mutation {
        signup(signupInput: SignupInput): User!
        verifyUser(verifyInput: VerifyInput): User!
        login(loginInput: LoginInput): User!
        forgotPassword(forgotInput: ForgotInput): User!
        resetPassword(resetInput: ResetInput): User!
    }
`
