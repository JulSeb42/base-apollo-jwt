/*=============================================== User mutations ===============================================*/

export const UserMutation = {
    editUser: async (
        _: any,
        { editUserInput: { _id, fullName } }: any,
        { editUser }: any
    ) => await editUser({ _id, fullName }),

    editPassword: async (
        _: any,
        { editPasswordInput }: any,
        { editPassword }: any
    ) => await editPassword(editPasswordInput),

    deleteUser: async (_: any, { _id }: any, { deleteUser }: any) =>
        await deleteUser({ _id }),
}
