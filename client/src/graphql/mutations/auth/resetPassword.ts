/*=============================================== Reset password ===============================================*/

import { gql } from "@apollo/client"

const RESET_PASSWORD = gql`
    mutation resetPassword($resetInput: ResetInput) {
        resetPassword(resetInput: $resetInput) {
            _id
        }
    }
`

export default RESET_PASSWORD
