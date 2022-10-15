/*=============================================== Context middleware ===============================================*/

const { AuthenticationError } = require("apollo-server")
const jwt = require("jsonwebtoken")

const User = require("../models/User.model")

const authContext = async ({ req, ...rest }) => {
    let user = null

    try {
        const authHeader = req.headers.authorization || ""

        if (authHeader) {
            const token = authHeader.split("Bearer")[1]

            // const payload = await verifyToken(token)

            // user = await User.findOne({
            //     user_id: payload.authToken,
            // })

            if (token) {
                try {
                    return jwt.verify(token, process.env.TOKEN_SECRET)
                } catch (err) {
                    throw new AuthenticationError("Invalid / expired token")
                }
            } else {
                throw new Error('Authentication token must be "Bearer [token]"')
            }
        }
    } catch (error) {
        console.error(error)
    }

    return { ...rest, req, auth: { user } }
}

module.exports = authContext
