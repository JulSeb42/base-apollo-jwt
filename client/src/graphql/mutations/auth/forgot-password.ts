/*=============================================== Forgot password ===============================================*/

import { gql } from "@apollo/client"

export const FORGOT_PASSWORD = gql`
    mutation forgotPassword($forgotInput: ForgotInput) {
        forgotPassword(forgotInput: $forgotInput) {
            email
        }
    }
`
