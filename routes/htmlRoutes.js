var db = require('../models')

module.exports = function (app) {
  // Load index page
  app.get('/', function (req, res) {
    db.Example.findAll({}).then(function (dbExamples) {
      res.render('index', {
        msg: 'Welcome!',
        examples: dbExamples
      })
    })
  })

  // Load example page and pass in an example by id
  app.get('/example/:id', function (req, res) {
    db.Example.findOne({ where: { id: req.params.id } }).then(function (
      dbExample
    ) {
      res.render('example', {
        example: dbExample
      })
    })
  })

  // Lang and Culture Test
  app.get('/lang-culture', function (req, res) {
    console.log(req.headers['accept-language'])
    res.render('lang', {
      lang: req.headers['accept-language']
    })
  })

  app.post('/lang-culture', function () {
    console.log('post test lang-culture')
  })

  app.post('/', function (req, res) {
    console.log('post test')
    const countryData = {
      name: 'Test Country',
      image: '/images/countries/sri-lanka.jpg'
    }
    res.json(countryData)
  })

  // Render 404 page for any unmatched routes
  app.get('*', function (req, res) {
    res.render('404')
  })
}
