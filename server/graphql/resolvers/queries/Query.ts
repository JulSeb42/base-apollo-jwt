/*=============================================== Queries ===============================================*/

const Query = {
    users: async (_: any, __: any, { users }: any) => {
        console.log("Users query")
        return await users()
    },
    user: async (_: any, { _id }: any, { user }: any) => await user({ _id }),
}

export { Query }
