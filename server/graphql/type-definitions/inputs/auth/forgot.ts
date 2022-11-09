/*=============================================== Forgot input ===============================================*/

import { gql } from "apollo-server"

export const ForgotInput = gql`
    input ForgotInput {
        email: String!
    }
`
