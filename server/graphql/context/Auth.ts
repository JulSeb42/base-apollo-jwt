/*=============================================== Auth context ===============================================*/

import { ApolloError } from "apollo-server"
import bcrypt from "bcryptjs"
import { getRandomString, emailRegex, passwordRegex } from "ts-utils-julseb"
import jwt from "jsonwebtoken"

import sendMail from "../../utils/send-mail"

import User from "../../models/User.model"
import { UserType } from "../../types"

import { SALT_ROUNDS, JWT_CONFIG, TOKEN_SECRET } from "../../utils/consts"

const AuthContext = {
    signup: async ({ fullName, email, password }: UserType) => {
        const foundUser = await User.findOne({ email })
        const verifyToken = getRandomString(20)

        if (!emailRegex.test(email)) {
            throw new ApolloError("Email is not valid.", "EMAIL_NOT_VALID")
        }

        if (!passwordRegex.test(password)) {
            throw new ApolloError(
                "Password needs to have at least 6 chars and must contain at least one number, one lowercase and one uppercase letter.",
                "PASSWORD_NOT_VALID"
            )
        }

        if (!foundUser) {
            const salt = bcrypt.genSaltSync(SALT_ROUNDS)
            const hashedPassword = bcrypt.hashSync(password, salt)

            const newUser: any = new User({
                fullName,
                email,
                password: hashedPassword,
                verified: false,
                verifyToken,
            })

            const token = jwt.sign(
                newUser._doc,
                TOKEN_SECRET,
                // @ts-expect-error
                JWT_CONFIG
            )

            newUser.token = token

            const res = await newUser.save().then((res: any) => {
                sendMail(
                    email,
                    "Verify your account on our app",
                    `Hello,<br /><br />Thank you for creating your account on our app! <a href="${process.env.ORIGIN}/verify/${verifyToken}/${res._id}">Click here to verify your account</a>.`
                )

                return res
            })

            return res
        } else {
            throw new ApolloError(
                `A user already exists with the email ${email}`,
                "USER_ALREADY_EXISTS"
            )
        }
    },

    login: async ({ email, password }: UserType) => {
        if (!email) {
            throw new ApolloError("Email is required", "EMAIL_REQUIRED")
        }

        if (!password) {
            throw new ApolloError("Password is required", "PASSWORD_REQUIRED")
        }

        const foundUser: any = await User.findOne({ email })

        if (foundUser) {
            if (await bcrypt.compare(password, foundUser.password)) {
                // @ts-expect-error
                const token = jwt.sign(user._doc, TOKEN_SECRET, JWT_CONFIG)

                foundUser.token = token

                return foundUser._doc
            } else {
                throw new ApolloError(
                    "Incorrect password",
                    "INCORRECT_PASSWORD"
                )
            }
        } else {
            throw new ApolloError(
                "This user does not exist.",
                "USER_NON_EXISTENT"
            )
        }
    },

    verifyUser: async ({ _id, verifyToken }: UserType) => {
        const foundUser = await User.findById(_id)

        if (foundUser) {
            if (foundUser.verifyToken === verifyToken) {
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

    forgotPassword: async ({ email }: UserType) => {
        const foundUser = await User.findOne({ email })

        if (foundUser) {
            const resetToken = getRandomString(20)

            const res = await User.findOneAndUpdate(
                { email },
                { resetToken: resetToken },
                { new: true }
            ).then((res: any) => {
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

    resetPassword: async ({ _id, resetToken, password }: UserType) => {
        const foundUser = await User.findById(_id)

        if (foundUser) {
            if (foundUser.resetToken === resetToken) {
                const updatedUser: any = {}

                if (password) {
                    if (!passwordRegex.test(password)) {
                        throw new ApolloError(
                            "Password needs to have at least 6 chars and must contain at least one number, one lowercase and one uppercase letter.",
                            "PASSWORD_NOT_VALID"
                        )
                    }

                    const salt = bcrypt.genSaltSync(SALT_ROUNDS)
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

export { AuthContext }
