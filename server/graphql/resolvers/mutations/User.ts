/*=============================================== User mutations ===============================================*/

export const UserMutation = {
    editUser: async (_: any, { editUserInput }: any, { editUser }: any) =>
        await editUser(editUserInput),

    editPassword: async (
        _: any,
        { editPasswordInput }: any,
        { editPassword }: any
    ) => await editPassword(editPasswordInput),

    deleteUser: async (_: any, { _id }: any, { deleteUser }: any) =>
        await deleteUser({ _id }),
}
