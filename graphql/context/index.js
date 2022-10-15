/*=============================================== Context ===============================================*/

const authContext = require("./auth")
const usersContext = require("./users")

const context = {
    ...authContext,
    ...usersContext,
}

module.exports = context
