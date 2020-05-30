const db = require('../models')
// const computerVision = require('../CompVision.js')
// const simpleVision = require('../simpleVision.js')
const axios = require('axios')
const request = require('request')
const geoip = require('geoip-lite')
const multer = require('multer')
const subscriptionKey = process.env.KEY
const endpoint = process.env.ENDPOINT
if (!subscriptionKey) { throw new Error(); }
const medianIncome = require('../medianIncome.js')
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
      interests_details: [],
      interests: '',
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

    userProfile.images = userProfile.images.map((item) => {
      return protocol + '://' + host + '/userImages/' + item.filename
    })

    for (var i = 0; i < medianIncome.length; i++) {
      if (userProfile.geo.region === medianIncome[i].location) {
        // console.log(MediumIncome[i].income)
        var income = medianIncome[i].income
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

          var fakeArray = ['https://images.pexels.com/photos/3452554/pexels-photo-3452554.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260', 'https://images.pexels.com/photos/4827/nature-forest-trees-fog.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260', 'https://images.pexels.com/photos/417173/pexels-photo-417173.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260']

          var uriBase = endpoint + 'vision/v3.0/analyze';

          var count = 0

          function getCategories() {
            request({
              method: 'POST',
              url: uriBase,
              headers: {
                'content-type': 'application/json',
                'ocp-apim-subscription-key': subscriptionKey
              },
              body: {
                // url: userProfile.images[count]
                url: fakeArray[count]
              },
              json: true
            }, function (error, response, body) {
              if (error) throw new Error(error);
              console.log(`Checked an image`)
              // userProfile.interests.push(body.categories)
              userProfile.interests_details.push(body.categories[0].name)
              console.log(userProfile)
            })

            if (count < userProfile.images.length - 1) {
              console.log(count)
              count++
              getCategories()
            } else {
              const imagePath = '/images/countries/'
              // Using fake data
              const countryData = {
                countryName: 'Test Country',
                countryImage: `${imagePath}sri-lanka.jpg`
              }
              console.log(countryData)

              // get interst answer
              // find duplicates in array

              var targetCategories = ['food', 'animal', 'drink', 'building', 'outdoor', 'plant']
              // 
              userProfile.forEach((item) => {
                if (targetCategories.includes(item.split('_')[0])) {
                  userProfile.interests.push(item.split('_')[0])
                }
              })
              // if no duplicates return userPrile.interests_details[0]
              // END get interest
              res.render('index', {
                countryData: countryData
              })
            }

          }

          getCategories()











          // res.redirect('/')
        })
      })
    })
  })
}

