/*=============================================== User context ===============================================*/

import User from "../../models/User.model"

const UserContext = {
    users: async () => await User.find(),
    user: async ({ _id }: any) => await User.findById(_id),
}

export { UserContext }
