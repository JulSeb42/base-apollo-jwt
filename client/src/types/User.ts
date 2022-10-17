/*=============================================== User type ===============================================*/

type UserType = {
    fullName: string
    email: string
    password: string
    exp: number | string
    token: string
    _id: string
    verified: boolean
    verifyToken: string
}

export type { UserType }
