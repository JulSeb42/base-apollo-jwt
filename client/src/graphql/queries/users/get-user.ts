/*=============================================== Get user ===============================================*/

import { gql } from "@apollo/client"

export const GET_USER = gql`
    query ($_id: ID!) {
        user(_id: $_id) {
            fullName
            email
        }
    }
`
