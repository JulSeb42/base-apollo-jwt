/*=============================================== Delete user ===============================================*/

import { gql } from "@apollo/client"

const DELETE_USER = gql`
    mutation deleteUser($id: ID!) {
        deleteUser(_id: $id)
    }
`

export { DELETE_USER }
