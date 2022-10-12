/*=============================================== Delete user ===============================================*/

import { gql } from "@apollo/client"

const DELETE_USER = gql`
    mutation deleteUser($id: ID!) {
        deleteUser(id: $id)
    }
`

export default DELETE_USER
