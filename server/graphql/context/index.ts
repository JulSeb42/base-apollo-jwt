/*=============================================== Context ===============================================*/

import AuthContext from "./Auth"
import UsersContext from "./User"

const context = {
    ...AuthContext,
    ...UsersContext,
}

export default context
