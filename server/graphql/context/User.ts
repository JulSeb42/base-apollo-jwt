/*=============================================== User context ===============================================*/

import { ApolloError } from "apollo-server"

import User from "../../models/User.model"
import { UserType } from "../../types"

const UsersContext = {
    editUser: async ({ _id, fullName }: UserType) => {
        const updatedUser: any = {}

        if (fullName !== undefined) {
            updatedUser.fullName = fullName
        } else {
            throw new ApolloError(
                "Your full name is required",
                "FULL_NAME_REQUIRED"
            )
        }

        const user = await User.findByIdAndUpdate(_id, updatedUser, {
            new: true,
        })

        return user
    },

    deleteUser: async ({ _id }: UserType) => {
        if (!_id) {
            throw new ApolloError("ID is missing", "ID_MISSING")
        }

        await User.findByIdAndDelete(_id)
        return `User ${_id} was deleted successfully`
    },
}

export default UsersContext
