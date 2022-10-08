/*=============================================== Users resolvers ===============================================*/

const { ApolloError } = require("apollo-server-errors")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const User = require("../../models/User.model")
const { saltRounds } = require("../../utils/consts")
const jwtConfig = require("../../utils/jwt.config")

const usersResolvers = {
    Query: {
        allUsers: async () => await User.find(),
        getUser: async (_, { id }) => await User.findById(id),
    },

    Mutation: {
        editUser: async (_, { editUserInput: { id, fullName } }) => {
            const updatedUser = {}

            if (fullName !== undefined) {
                updatedUser.fullName = fullName
            }

            const user = await User.findByIdAndUpdate(id, updatedUser, { new: true })

            return user
        },
        deleteUser: async (_, { id }) => {
            await User.findByIdAndDelete(id)
            return `User ${id} was deleted successfully`
        },
    },
}

module.exports = usersResolvers
