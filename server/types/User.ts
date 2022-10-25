/*=============================================== User type ===============================================*/

export type UserType = {
    _id: string
    fullName: string
    email: string
    password: string
    verifyToken: string
    resetToken?: string
    token: string
}
