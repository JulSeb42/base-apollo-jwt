/*=============================================== Consts ===============================================*/

import "dotenv/config"

export const MONGODB_URI =
    process.env.MONGODB_URI || "mongodb://localhost/base-apollo-jwt"

export const PORT = process.env.PORT || 5005

export const TOKEN_SECRET = process.env.TOKEN_SECRET || ""

export const SALT_ROUNDS = 10

export const JWT_CONFIG = {
    algorithm: "HS256",
    expiresIn: "10d",
}
