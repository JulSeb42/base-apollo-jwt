/*=============================================== Reset password ===============================================*/

import { gql } from "@apollo/client"

export const RESET_PASSWORD = gql`
    mutation resetPassword($resetInput: ResetInput) {
        resetPassword(resetInput: $resetInput) {
            _id
        }
    }
`
