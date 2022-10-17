/*=============================================== Query ===============================================*/

import User from "../../../models/User.model"

import { UserType } from "../../../types"

const Query = {
    allUsers: async () => await User.find(),
    getUser: async (_: any, { _id }: UserType) => await User.findById(_id),
}

export { Query }
