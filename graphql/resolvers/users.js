/*=============================================== Users resolvers ===============================================*/

const { ApolloError } = require("apollo-server-errors")

const User = require("../../models/User.model")

const usersResolvers = {
    Query: {
        allUsers: async () => await User.find(),
        getUser: async (_, { _id }) => await User.findById(_id),
    },

    Mutation: {
        editUser: async (
            _,
            { editUserInput: { _id, fullName } },
            { editUser }
        ) => editUser({ _id, fullName }),

        deleteUser: async (_, { _id }, { deleteUser }) => deleteUser({ _id }),
    },
}

module.exports = usersResolvers
