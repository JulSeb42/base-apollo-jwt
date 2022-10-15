/*=============================================== Server ===============================================*/

require("dotenv/config")
const { ApolloServer } = require("apollo-server")

const typeDefs = require("./graphql/typeDefs")
const resolvers = require("./graphql/resolvers")
const context = require("./graphql/context/index")

require("./db")

const PORT = process.env.PORT

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context,
})

server
    .listen({ port: PORT })
    .then(({ url }) => {
        console.log(`Server listening on ${url}`)
    })
    .catch(err => console.log(err))
