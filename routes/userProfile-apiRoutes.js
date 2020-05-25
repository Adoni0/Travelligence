var db = require('../models')

module.exports = function (app) {
  // Get all examples
  app.get('/api/examples', function (req, res) {
    db.Example.findAll({}).then(function (dbExamples) {
      res.json(dbExamples)
    })
  })

  // Create a new example
  app.post('/api/examples', function (req, res) {
    db.Example.create(req.body).then(function (dbExample) {
      res.json(dbExample)
    })
  })

}

if (wealth <= .33333) {
    //cost bracket = economy
    db.Profile.update({
      cost_bracket: 'Economy'
    },
      {
        where: {
          id: req.body.id
        }
      }
    ).catch(function (error) {
      if (error) throw error
    });
  } else if (wealth <= .66666 && wealth > .33333) {
    //cost bracket = moderate
    db.Profile.update({
      cost_bracket: 'Moderate'
    },
      {
        where: {
          id: req.body.id
        }
      }
    ).catch(function (error) {
      if (error) throw error
    });
  } else {
    //cost bracket = luxury
    db.Profile.update({
      cost_bracket: 'Luxury'
    },
      {
        where: {
          id: req.body.id
        }
      }
    ).catch(function (error) {
      if (error) throw error
    });
  };