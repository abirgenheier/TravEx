var passport = require('passport')
var GoogleStrategy = require('passport-google-oauth20').Strategy

passport.serializeUser((user, done) => {
    done(null, user)
});
passport.deserializeUser((user, done) => {
    // User.findById(id, (err, user) => {
    done(null, user)
    // })
})

passport.use(new GoogleStrategy({
    clientID: "595606650638-04ugaq25i1gtsm3aqg74c6f4h085incb.apps.googleusercontent.com",
    clientSecret: "TUjbOyiUaFvnWvgQFeFi_a6j",
    callbackURL: "http://localhost:8080/google/callback"
},
    (accessToken, refreshToken, profile, done) => {
        // User.findOrCreate({ googleId: profile.id }, (err, user) => {
        // return cb(err, user)
        // console.log(profile)
        return done(null, profile)

    }))

