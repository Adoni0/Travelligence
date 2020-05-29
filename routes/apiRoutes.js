const db = require('../models')
const computerVision = require('../CompVision.js')
const axios = require('axios')
const geoip = require('geoip-lite')
const multer = require('multer')
const mediumIncome = require('../mediumIncome.js')
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/userImages')
  },
  filename: function (req, file, cb) {
    const ext = file.mimetype.replace(/image\//gi, '.')
    cb(null, Date.now() + ext)
  }
})

var upload = multer({ storage: storage })

module.exports = function (app) {
  app.post('/api/travelligence', upload.array('interests-images'), (req, res) => {
    const name = req.body.name
    const images = req.files
    const lang = !!req.body['lang-pref']
    const culture = !!req.body['culture-pref']
    const ip = req.headers['x-forwarded-for'] || req.ip
    const langSetting = req.headers['accept-language']

    const result = {
      name: name,
      images: images,
      lang: lang,
      culture: culture,
      ip: ip,
      langSetting: langSetting,
      geo: geoip.lookup('207.97.227.239')
    }

    axios.get(`https://api.agify.io?name=${result.name}&country_id=${result.geo.country}`).then((data) => {
      console.log(data)
      result.age = data.data.age.toFixed(2)
    })

    for (var i = 0; i < mediumIncome.length; i++) {
      if (result.geo.region === mediumIncome[i].location) {
        // console.log(MediumIncome[i].income)
        var income = mediumIncome[i].income

        result.wealth = (income + result.age) / 2
      } else {
        console.log('Could not find your state')
      }
    }

    db.Profile.create({
      location: result.geo.region,
      wealth: result.wealth,

      where: {
        id: req.body.id // have to give value of {{id}} to section of handlebars
      }

    }).catch(function (error) {
      if (error) throw error
    })

    console.log(result)

    result.images.forEach(function (image) {
      console.log(image.path)

      computerVision(image.filename)
    })

    res.redirect('/')
  })
}
