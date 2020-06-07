const express = require('express')
const app = express()
const PORT = process.env.PORT || 8080;

const db = require('./models')

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use(express.static("public"))

require("./routes/api-routes")(app)
require("./routes/html-routes")(app)

db.sequelize.sync({ force: true }).then(() => {
    app.listen(PORT, () => {
        console.log('APP LISTENING ON PORT' + PORT)
    })
})
