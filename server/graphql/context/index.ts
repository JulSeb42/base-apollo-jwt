/*=============================================== Context ===============================================*/

import { UserContext } from "./User"
import { AuthContext } from "./Auth"

const context = {
    ...AuthContext,
    ...UserContext,
}

export default context
