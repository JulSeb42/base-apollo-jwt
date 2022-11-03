/*=============================================== Delete user ===============================================*/

import { gql } from "@apollo/client"

export const DELETE_USER = gql`
    mutation deleteUser($id: ID!) {
        deleteUser(_id: $id)
    }
`
