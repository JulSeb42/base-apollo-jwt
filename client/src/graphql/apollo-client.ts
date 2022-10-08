/*=============================================== Apollo client ===============================================*/

import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client"
import { setContext } from "@apollo/client/link/context"

const GRAPHQL_URI = process.env.REACT_APP_GRAPHQL_URI

const httpLink = createHttpLink({
    uri: GRAPHQL_URI,
})

const authLink = setContext((_, { headers }) => {
    return {
        headers: {
            ...headers,
            authorization: localStorage.getItem("authToken") || "",
        },
    }
})

const client = new ApolloClient({
    uri: GRAPHQL_URI,
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
})

export default client
