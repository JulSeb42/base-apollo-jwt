/*=============================================== Resolvers ===============================================*/

import Query from "./queries"
import * as Mutation from "./mutations"

const resolvers = {
    Query,
    ...Mutation,
}

export default resolvers
