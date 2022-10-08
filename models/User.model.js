/*=============================================== User model ===============================================*/

const { Schema, model } = require("mongoose")

const userSchema = new Schema(
    {
        email: {
            type: String,
            unique: true,
            required: true,
        },
        fullName: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        token: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
)

const User = model("User", userSchema)

module.exports = User
