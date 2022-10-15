/*=============================================== All users ===============================================*/

import { gql } from "@apollo/client"

const ALL_USERS = gql`
    query allUsers {
        allUsers {
            _id
            fullName
            email
        }
    }
`

export default ALL_USERS