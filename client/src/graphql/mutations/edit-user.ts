/*=============================================== Edit user ===============================================*/

import { gql } from "@apollo/client"

const EDIT_USER = gql`
    mutation editUser($editUserInput: EditUserInput) {
        editUser(editUserInput: $editUserInput) {
            id
            fullName
            email
            password
            token
        }
    }
`

export default EDIT_USER
