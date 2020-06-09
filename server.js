const express = require('express')
const app = express()
let PORT = process.env.PORT || 8080;
require('dotenv').config()

const db = require('./models')

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use(express.static("public"))

require("./routes/static-api-routes")(app)
require("./routes/dynamic-api-routes")(app)
require("./routes/html-routes")(app)

db.sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => {
        console.log('APP LISTENING ON PORT' + PORT)
    })
})
