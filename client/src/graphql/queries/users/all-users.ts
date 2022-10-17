/*=============================================== All users ===============================================*/

import { gql } from "@apollo/client"

const ALL_USERS = gql`
    query {
        allUsers {
            _id
            fullName
            email
        }
    }
`

export { ALL_USERS }
