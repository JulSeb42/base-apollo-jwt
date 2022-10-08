/*=============================================== Get user ===============================================*/

import { gql } from "@apollo/client"

const GET_USER = gql`
    query getUser($id: ID!) {
        getUser(id: $id) {
            id
            fullName
            email
        }
    }
`

export default GET_USER
