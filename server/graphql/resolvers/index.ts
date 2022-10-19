/*=============================================== Resolvers ===============================================*/

import { Query } from "./queries"
import { AuthMutation, UserMutation } from "./mutations"

const resolvers = {
    // Queries
    Query,

    // Mutations
    Mutation: {
        ...AuthMutation,
        ...UserMutation,
    },
}

export default resolvers
