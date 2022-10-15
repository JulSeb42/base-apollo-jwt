/*=============================================== Auth context ===============================================*/

const { ApolloError } = require("apollo-server-errors")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const {
    getRandomString,
    emailRegex,
    passwordRegex,
} = require("ts-utils-julseb")

const { saltRounds } = require("../../utils/consts")
const jwtConfig = require("../../utils/jwt.config")
const sendMail = require("../../utils/send-mail")

const User = require("../../models/User.model")

const authContext = {
    signup: async ({ fullName, email, password }) => {
        const foundUser = await User.findOne({ email })
        const verifyToken = getRandomString(20)

        if (foundUser) {
            throw new ApolloError(
                `A user already exists with the email ${email}`,
                "USER_ALREADY_EXISTS"
            )
        }

        if (!emailRegex.test(email)) {
            throw new ApolloError("Email is not valid.", "EMAIL_NOT_VALID")
        }

        if (!passwordRegex.test(password)) {
            throw new ApolloError(
                "Password needs to have at least 6 chars and must contain at least one number, one lowercase and one uppercase letter.",
                "PASSWORD_NOT_VALID"
            )
        }

        const salt = bcrypt.genSaltSync(saltRounds)
        const hashedPassword = bcrypt.hashSync(password, salt)

        const newUser = new User({
            fullName,
            email,
            password: hashedPassword,
            verified: false,
            verifyToken,
        })

        const token = jwt.sign(
            newUser._doc,
            process.env.TOKEN_SECRET,
            jwtConfig
        )

        newUser.token = token

        const res = await newUser.save().then(res => {
            sendMail(
                email,
                "Verify your account on our app",
                `Hello,<br /><br />Thank you for creating your account on our app! <a href="${process.env.ORIGIN}/verify/${verifyToken}/${res._id}">Click here to verify your account</a>.`
            )

            return res
        })

        return res

        // return res._doc
    },

    login: async ({ email, password }) => {
        if (!email) {
            throw new ApolloError("Email is required", "EMAIL_REQUIRED")
        }

        if (!password) {
            throw new ApolloError("Password is required", "PASSWORD_REQUIRED")
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
            throw new ApolloError("Incorrect password", "INCORRECT_PASSWORD")
        }
    },

    verifyUser: async ({ _id, verifyToken }) => {
        const user = await User.findById(_id)

        if (user) {
            if (user.verifyToken === verifyToken) {
                return User.findByIdAndUpdate(
                    _id,
                    { verified: true },
                    { new: true }
                )
            } else {
                throw new ApolloError(
                    "An error occured with your verify token.",
                    "TOKEN_NOT_MATCHING"
                )
            }
        } else {
            throw new ApolloError("User not found.", "USER_NOT_FOUND")
        }
    },

    forgotPassword: async ({ email }) => {
        const user = await User.findOne({ email })

        if (user) {
            const resetToken = getRandomString(20)

            const res = await User.findOneAndUpdate(
                { email },
                { resetToken: resetToken },
                { new: true }
            ).then(res => {
                sendMail(
                    email,
                    "Reset your password on our app",
                    `Hello,<br /><br />To reset your password, <a href="${process.env.ORIGIN}/reset-password/${resetToken}/${res._id}">click here</a>.`
                )

                return res
            })

            return res
        } else {
            throw new ApolloError("User not found.", "USER_NOT_FOUND")
        }
    },

    resetPassword: async ({ _id, resetToken, password }) => {
        const user = await User.findById(_id)

        if (user) {
            if (user.resetToken === resetToken) {
                const updatedUser = {}

                if (password) {
                    if (!passwordRegex.test(password)) {
                        throw new ApolloError(
                            "Password needs to have at least 6 chars and must contain at least one number, one lowercase and one uppercase letter.",
                            "PASSWORD_NOT_VALID"
                        )
                    }

                    const salt = bcrypt.genSaltSync(saltRounds)
                    const hashedPassword = bcrypt.hashSync(password, salt)

                    updatedUser.password = hashedPassword

                    return User.findByIdAndUpdate(_id, updatedUser, {
                        new: true,
                    })
                } else {
                    throw new ApolloError(
                        "Password is required",
                        "PASSWORD_REQUIRED"
                    )
                }
            } else {
                throw new ApolloError("Wrong reset token.", "WRONG_TOKEN")
            }
        } else {
            throw new ApolloError("User not found.", "USER_NOT_FOUND")
        }
    },
}

module.exports = authContext
