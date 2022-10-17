/*=============================================== User type ===============================================*/

type UserType = {
    _id: string
    fullName: string
    email: string
    password: string
    verifyToken: string
    resetToken?: string
}

export { UserType }
