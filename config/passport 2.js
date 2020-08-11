var db = require('../models')
var passport = require('passport')
var GitHubStrategy = require('passport-github').Strategy

passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: 'https://blue-project-2.herokuapp.com/dashboard'
      // "https://blue-project-2.herokuapp.com/dashboard"
    },
    function (accessToken, refreshToken, profile, cb) {
      db.Admin.findOrCreate({
        id: profile.id,
        where: { id: profile.username }
      }).then(() => {
        return cb(null, profile)
      })

    }
  )
)

passport.serializeUser(function (user, cb) {
  cb(null, user)
})

passport.deserializeUser(function (obj, cb) {
  cb(null, obj)
})


module.exports = passport
