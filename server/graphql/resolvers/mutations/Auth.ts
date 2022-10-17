/*=============================================== Auth mutations ===============================================*/

import { UserType } from "../../../types"

const Auth = {
    signup: async (
        _: any,
        { signupInput: { fullName, email, password } }: any,
        { signup }: any
    ) => await signup({ fullName, email, password }),

    login: async (
        _: any,
        { loginInput: { email, password } }: any,
        { login }: any
    ) => login({ email, password }),

    verifyUser: async (
        _: any,
        { verifyInput: { _id, verifyToken } }: any,
        { verifyUser }: any
    ) => verifyUser({ _id, verifyToken }),

    forgotPassword: async (
        _: any,
        { forgotInput: { email } }: any,
        { forgotPassword }: any
    ) => {
        return await forgotPassword({ email })
    },

    resetPassword: async (
        _: any,
        { resetInput: { _id, resetToken, password } }: any,
        { resetPassword }: any
    ) => {
        return await resetPassword({ _id, resetToken, password })
    },
}

export default Auth
