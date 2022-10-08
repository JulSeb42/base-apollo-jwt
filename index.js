/*=============================================== Server ===============================================*/

require("dotenv/config")
const { ApolloServer } = require("apollo-server")
const mongoose = require("mongoose")

const typeDefs = require("./graphql/typeDefs")
const resolvers = require("./graphql/resolvers")

const PORT = process.env.PORT
const MONGODB_URI = process.env.MONGODB_URI

const server = new ApolloServer({
    typeDefs,
    resolvers,
})

mongoose
    .connect(MONGODB_URI, {
        useNewUrlParser: true,
    })
    .then(() => {
        console.log("Connected to MongoDb")
        return server.listen({ port: PORT })
    })
    .then(res => console.log(`Server running at ${res.url}`))
    .catch(err => console.log(err))
