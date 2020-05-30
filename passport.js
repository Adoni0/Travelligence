//npm install passport-github
var GitHubStrategy = require('passport-github').Strategy

passport.use(new GitHubStrategy({
    clientID: process.env['GITHUB_CLIENT_ID'],
    clientSecret: process.env['GITHUB_CLIENT_SECRET'],
    callbackURL: "https://blue-project-2.herokuapp.com/dashboard"
  },
  function(accessToken, refreshToken, profile, cb) {
    User.findOrCreate({ githubId: profile.id }, function (err, user) {
      return cb(err, user)
    })
  }
))


passport.serializeUser(function(user, cb) {
    cb(null, user)
  })
  
  passport.deserializeUser(function(obj, cb) {
    cb(null, obj)
  })

  app.get('/',
  function(req, res) {
    res.render('home', { user: req.user })
  })

app.get('/login',
  function(req, res){
    res.render('login')
  })


app.get('/auth/github',
  passport.authenticate('github'))

app.get('/auth/github/callback', 
  passport.authenticate('github', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/')
  })

//   app.get('/profile',
//   require('connect-ensure-login').ensureLoggedIn(),
//   function(req, res){
//     res.render('profile', { user: req.user });
//   });