/*=============================================== Users context ===============================================*/

const { ApolloError } = require("apollo-server-errors")

const User = require("../../models/User.model")

const usersContext = {
    editUser: async ({ _id, fullName }) => {
        const updatedUser = {}

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

    deleteUser: async ({ _id }) => {
        if (!_id) {
            throw new ApolloError("ID is missing", "ID_MISSING")
        }

        await User.findByIdAndDelete(_id)
        return `User ${_id} was deleted successfully`
    },
}

module.exports = usersContext
