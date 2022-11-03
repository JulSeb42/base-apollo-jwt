/*=============================================== Edit password ===============================================*/

import { gql } from "@apollo/client"

export const EDIT_PASSWORD = gql`
    mutation ($editPasswordInput: EditPasswordInput) {
        editPassword(editPasswordInput: $editPasswordInput) {
            _id
            fullName
            email
            password
            token
        }
    }
`
