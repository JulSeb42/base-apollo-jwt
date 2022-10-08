/*=============================================== Authentication middleware ===============================================*/

const { AuthenticationError } = require("apollo-server")
const jwt = require("jsonwebtoken")

module.exports = context => {
    const authHeader = context.req.headers.authorization

    if (authHeader) {
        const token = authHeader.split("Bearer")[1]

        if (token) {
            try {
                return jwt.verify(token, process.env.TOKEN_SECRET)
            } catch (err) {
                throw new AuthenticationError("Invalid / expired token")
            }
        } else {
            throw new Error('Authentication token must be "Bearer [token]"')
        }
    } else {
        throw new Error("Authorization header must be provided")
    }
}
