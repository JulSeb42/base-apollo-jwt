/*=============================================== Forgot password ===============================================*/

import { gql } from "@apollo/client"

const FORGOT_PASSWORD = gql`
    mutation forgotPassword($forgotInput: ForgotInput) {
        forgotPassword(forgotInput: $forgotInput) {
            email
        }
    }
`

export default FORGOT_PASSWORD
