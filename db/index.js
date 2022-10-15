/*=============================================== Connect to database ===============================================*/

const mongoose = require("mongoose")

const MONGODB_URI = process.env.MONGODB_URI

mongoose
    .connect(MONGODB_URI)
    .then(res =>
        console.log(
            `Connected to Mongo! Database name: "${res.connections[0].name}"`
        )
    )
    .catch(err => console.log(`Error connecting to Mongo: ${err}`))
