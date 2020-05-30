var db = require('../models')
var passport = require('passport')
var GitHubStrategy = require('passport-github').Strategy

passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: 'http://localhost:3000/dashboard'
      // "https://blue-project-2.herokuapp.com/dashboard"
    },
    function (accessToken, refreshToken, profile, cb) {
      db.Admin.findOrCreate({
        id: profile.id,
        where: { id: profile.username }
      }).then(() => {
        return cb(null, profile)
      })

      // .then((user) => {
      //   // console.log(something)
      //   return cb(user);
      // });
      // User.findOrCreate({ githubId: profile.id }, function (err, user) {
      //   return cb(err, user)
      // })
      // console.log("Ideally add user to db here.");
      // return cb(profile.Id)
    }
  )
)

passport.serializeUser(function (user, cb) {
  cb(null, user)
})

passport.deserializeUser(function (obj, cb) {
  cb(null, obj)
})

// app.use(passport.initialize());
// app.use(passport.session());

// app.get('/',
//   function (req, res) {
//     res.render('home', { user: req.user })
//   })

// app.get('/login',
//   function (req, res) {
//     res.render('login')
//   })

// app.get('/auth/github',
//   passport.authenticate('github'))

// app.get('/auth/github/callback',
//   passport.authenticate('github', { failureRedirect: '/login' }),
//   function (req, res) {
//     // Successful authentication, redirect home.
//     res.redirect('/')
//     //https://blue-project-2.herokuapp.com/dashboard
//   })

//   app.get('/profile',
//   require('connect-ensure-login').ensureLoggedIn(),
//   function(req, res){
//     res.render('profile', { user: req.user });
//   });

module.exports = passport
