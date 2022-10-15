/*=============================================== Auth resolvers ===============================================*/

const { ApolloError } = require("apollo-server-errors")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const {
    getRandomString,
    emailRegex,
    passwordRegex,
} = require("ts-utils-julseb")

const User = require("../../models/User.model")
const { saltRounds } = require("../../utils/consts")
const jwtConfig = require("../../utils/jwt.config")

const usersResolvers = {
    Query: {},

    Mutation: {
        signup: async (
            _,
            { signupInput: { fullName, email, password } },
            { signup }
        ) => signup({ fullName, email, password }),

        login: async (_, { loginInput: { email, password } }, { login }) =>
            login({ email, password }),

        verifyUser: async (
            _,
            { verifyInput: { _id, verifyToken } },
            { verifyUser }
        ) => verifyUser({ _id, verifyToken }),

        forgotPassword: async (
            _,
            { forgotInput: { email } },
            { forgotPassword }
        ) => {
            return await forgotPassword({ email })
        },

        resetPassword: async (
            _,
            { resetInput: { _id, resetToken, password } },
            { resetPassword }
        ) => {
            return await resetPassword({ _id, resetToken, password })
        },
    },
}

module.exports = usersResolvers
