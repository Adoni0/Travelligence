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


  app.post('/', function (req, res) {
    console.log('post test')
    const imagePath = '/images/countries/'
    // Using fake data
    const countryData = {
      name: 'Test Country',
      image: `${imagePath}sri-lanka.jpg`
    }
    res.json(countryData)
  })

  // Render 404 page for any unmatched routes
  app.get('*', function (req, res) {
    res.render('404')
  })
}
