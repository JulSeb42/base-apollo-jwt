/*=============================================== Server ===============================================*/

import { ApolloServer } from "apollo-server"

import typeDefs from "./graphql/type-definitions"
import resolvers from "./graphql/resolvers"
import context from "./graphql/context"

import "./routes/uploader"

import "./db"

import { PORT } from "./utils/consts"

const initServer = async () => {
    const server = new ApolloServer({
        typeDefs,
        resolvers,
        context,
    })

    await server
        .listen({ port: PORT })
        .then(({ url }) => console.log(`🚀 Apollo server running at ${url}`))
        .catch(err => console.log(err))
}

initServer()
