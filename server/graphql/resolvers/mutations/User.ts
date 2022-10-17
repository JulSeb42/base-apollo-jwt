/*=============================================== User mutations ===============================================*/

const User = {
    editUser: async (
        _: any,
        { editUserInput: { _id, fullName } }: any,
        { editUser }: any
    ) => editUser({ _id, fullName }),

    deleteUser: async (_: any, { _id }: any, { deleteUser }: any) =>
        deleteUser({ _id }),
}

export default User
