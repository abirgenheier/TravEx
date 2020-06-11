var path = require("path")
var passport = require("passport")

module.exports = app => {
    app.get("/", (req, res) => {
        res.sendFile(path.join(__dirname, "../public/index.html"))
    })
    app.get("/login", (req, res) => {
        res.sendFile(path.join(__dirname, "../public/login.html"))
    })
    app.get('/google-data', (req, res) => {
        res.json(req.user)
    })
    app.get('/github-data', (req, res) => {
        res.json(req.user)
    })
    app.get("/input", (req, res) => {
        res.sendFile(path.join(__dirname, "../public/input.html"))
    })
    app.get("/trips", (req, res) => {
        res.sendFile(path.join(__dirname, "../public/trips.html"))
    })
    app.get('/logout', (req, res) => {
        req.session = null;
        req.logout();
        res.redirect('/');
    })

    app.get('/login', passport.authenticate('github'))
    app.get('/auth', passport.authenticate('github', {
        successRedirect: '/',
        failureRedirect: '/failed'
    }))

    app.get('/google', passport.authenticate('google', { scope: ['profile'] }))
    app.get('/google/callback', passport.authenticate('google', { failureRedirect: '/failed' }),
        (req, res) => {
            res.redirect('/')
        })
};
