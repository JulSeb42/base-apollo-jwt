/*=============================================== Resolvers ===============================================*/

const authResolvers = require("./auth")
const usersResolvers = require("./users")

const resolvers = {
    Query: {
        ...authResolvers.Query,
        ...usersResolvers.Query,
    },

    Mutation: {
        ...authResolvers.Mutation,
        ...usersResolvers.Mutation,
    },
}

module.exports = resolvers
