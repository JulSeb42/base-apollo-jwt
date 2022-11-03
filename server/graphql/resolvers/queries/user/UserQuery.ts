/*=============================================== User query ===============================================*/

export const UserQuery = {
    loggedInUser: async (_: any, { token }: any, { loggedInUser }: any) =>
        await loggedInUser({ token }),
    users: async (_: any, __: any, { users }: any) => await users(),
    user: async (_: any, { _id }: any, { user }: any) => await user({ _id }),
}
