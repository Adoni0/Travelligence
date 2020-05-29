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
  app.post(
    '/api/travelligence',
    upload.array('interests-images'),
    (req, res) => {
      const protocol = req.protocol
      const host = req.get('host')
      const name = req.body.name
      const images = req.files
      const lang = !!req.body['lang-pref']
      const culture = !!req.body['culture-pref']
      const ip = req.headers['x-forwarded-for'] || req.ip
      const langSetting = req.headers['accept-language']

      const userProfile = {
        name: name,
        images: images,
        lang: lang,
        culture: culture,
        associatedCulture: [],
        ip: ip,
        langSetting: langSetting,
        wealthDetails: {
          age: 0,
          medianIncome: 0
        },
        wealth: 0,
        geo: geoip.lookup('207.97.227.239') // this.ip
      }

      for (var i = 0; i < mediumIncome.length; i++) {
        if (userProfile.geo.region === mediumIncome[i].location) {
          // console.log(MediumIncome[i].income)
          var income = mediumIncome[i].income
          if (income <= 0.55) {
            userProfile.wealthDetails.medianIncome = 0.34
          } else if (income <= 0.61) {
            userProfile.wealthDetails.medianIncome = 0.67
          } else {
            userProfile.wealthDetails.medianIncome = 1
          }
        } 
      }

      axios.get(`https://api.agify.io?name=${userProfile.name}&country_id=${userProfile.geo.country}`).then((data) => {
          // console.log(data)
          userProfile.age = Math.floor((data.data.age) * .7)
          // result.age = data.data.age.toFixed(2)
          if (userProfile.age <= 35) {
            userProfile.wealthDetails.age = 0.34
          } else if (userProfile.age <= 55) {
            userProfile.wealthDetails.age = 0.67
          } else {
            userProfile.wealthDetails.age = 1
          }

          userProfile.wealth = (userProfile.wealthDetails.age + userProfile.wealthDetails.medianIncome) / 2

          axios.get(`https://api.nationalize.io?name=${userProfile.name}`).then((data) => {
            
            data.data.country.forEach((country) => {
              userProfile.associatedCulture.push(country.country_id)
            })
            
            axios.get(`https://api.genderize.io?name=${userProfile.name}&country_id=${userProfile.geo.country}`).then((data) => {
              userProfile.gender = data.data.gender
              console.log(userProfile)
            })
          })
        })


      // var imgPath =
      //   protocol + '://' + host + '/userImages/' + images[0].filename
      // // result.images.forEach(function (image) {
      // // console.log(image.path)

      // computerVision(imgPath)

      res.redirect('/')
    }
  )
}
