/*=============================================== Auth resolvers ===============================================*/

const { ApolloError } = require("apollo-server-errors")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const User = require("../../models/User.model")
const { saltRounds } = require("../../utils/consts")
const jwtConfig = require("../../utils/jwt.config")

const usersResolvers = {
    Query: {},

    Mutation: {
        signup: async (_, { signupInput: { fullName, email, password } }) => {
            const foundUser = await User.findOne({ email })

            if (foundUser) {
                throw new ApolloError(
                    `A user already exists with the email ${email}`,
                    "USER_ALREADY_EXISTS"
                )
            }

            const salt = bcrypt.genSaltSync(saltRounds)
            const hashedPassword = bcrypt.hashSync(password, salt)

            const newUser = new User({
                fullName,
                email,
                password: hashedPassword,
            })

            const token = jwt.sign(
                newUser._doc,
                process.env.TOKEN_SECRET,
                jwtConfig
            )

            newUser.token = token

            const res = await newUser.save()

            return res._doc
        },

        login: async (_, { loginInput: { email, password } }) => {
            if (!email) {
                throw new ApolloError("Email is required", "EMAIL_REQUIRED")
            }

            if (!password) {
                throw new ApolloError(
                    "Password is required",
                    "PASSWORD_REQUIRED"
                )
            }

            const user = await User.findOne({ email })

            if (!user) {
                throw new ApolloError(
                    "This user does not exist.",
                    "USER_NON_EXISTENT"
                )
            }

            if (user && (await bcrypt.compare(password, user.password))) {
                const token = jwt.sign(
                    user._doc,
                    process.env.TOKEN_SECRET,
                    jwtConfig
                )

                user.token = token

                return user._doc
            } else {
                throw new ApolloError(
                    "Incorrect password",
                    "INCORRECT_PASSWORD"
                )
            }
        },
    },
}

module.exports = usersResolvers
