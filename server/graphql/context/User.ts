/*=============================================== User context ===============================================*/

import { ApolloError } from "apollo-server"
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"
import { passwordRegex } from "ts-utils-julseb"

import User from "../../models/User.model"
import { UserType } from "../../types"

import { SALT_ROUNDS } from "../../utils/consts"

const UsersContext = {
    editUser: async ({ _id, fullName }: UserType) => {
        const updatedUser: any = {}

        if (!fullName) {
            throw new ApolloError(
                "Your full name is required",
                "FULL_NAME_REQUIRED"
            )
        }

        const user = await User.findByIdAndUpdate(
            _id,
            { fullName },
            {
                new: true,
            }
        )

        return user
    },

    editPassword: async ({
        _id,
        oldPassword,
        newPassword,
    }: EditPasswordType) => {
        const user: UserType | null = await User.findById(_id)

        if (user) {
            if (await bcrypt.compare(oldPassword, user.password)) {
                if (passwordRegex.test(newPassword)) {
                    const salt = bcrypt.genSaltSync(SALT_ROUNDS)
                    const hashedPassword = bcrypt.hashSync(newPassword, salt)

                    return await User.findByIdAndUpdate(
                        _id,
                        { password: hashedPassword },
                        {
                            new: true,
                        }
                    )
                } else {
                    throw new ApolloError(
                        "Password needs to have at least 6 chars and must contain at least one number, one lowercase and one uppercase letter.",
                        "PASSWORD_NOT_VALID"
                    )
                }
            } else {
                throw new ApolloError(
                    "The old password does not match",
                    "PASSWORD_NOT_MATCHING"
                )
            }
        } else {
            throw new ApolloError("User not found", "USER_NOT_FOUND")
        }
    },

    deleteUser: async ({ _id }: UserType) => {
        if (!_id) {
            throw new ApolloError("ID is missing", "ID_MISSING")
        }

        await User.findByIdAndDelete(_id)
        return `User ${_id} was deleted successfully`
    },
}

export default UsersContext

type EditPasswordType = {
    _id: string
    oldPassword: string
    newPassword: string
}
