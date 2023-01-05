/*=============================================== Edit user ===============================================*/

import { gql } from "@apollo/client"

export const EDIT_USER = gql`
    mutation editUser($editUserInput: EditUserInput) {
        editUser(editUserInput: $editUserInput) {
            _id
            fullName
            email
            password
            token
            avatar
        }
    }
`
