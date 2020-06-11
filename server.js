require('dotenv').config()
var express = require('express')
var passport = require('passport')
var GitHubStrategy = require('passport-github')
var passportConfig = require('./config')
var app = express()
var cookieSession = require('cookie-session')
var PORT = process.env.PORT || 8080;
require('./passport-setup')


app.use(passport.initialize());
app.use(passport.session({
    secret: 'This group rocks',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
}));
passport.use(new GitHubStrategy(passportConfig, (accessToken, refreshToken, profile, cb) => {
    console.log(profile)
    return cb(null, profile)
}))
passport.serializeUser((user, cb) => {
    cb(null, user)
})
app.use(cookieSession({
    name: 'tuto-session',
    keys: ['key1', 'key2']
}))

// const isLoggedIn = (req, res, next) => {
//     if (req.user) {
//         next()
//     } else {
//         res.sendStatus(401)
//     }
// }

app.use(passport.initialize())
app.use(passport.session())

var db = require('./app/models')

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use(express.static("./app/public"))

require("./app/routes/static-api-routes")(app)
require("./app/routes/dynamic-api-routes")(app)
require("./app/routes/html-routes")(app)

db.sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => {
        console.log('APP LISTENING ON PORT' + PORT)
    })
})
