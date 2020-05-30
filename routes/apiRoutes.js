const db = require('../models')
const computerVision = require('../CompVision.js')
const simpleVision = require('../simpleVision.js')
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

      userProfile.images = userProfile.images.map((item) => {
        return protocol + '://' + host + '/userImages/' + item.filename
      })

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


            // iterate over array of images
            // finish each call of computerVision
            // store result in userProfile
            // once this is all complete res.render()

            var fakeArray = [
              'https://images.pexels.com/photos/704569/pexels-photo-704569.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
              'https://images.pexels.com/photos/4827/nature-forest-trees-fog.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
              'https://images.pexels.com/photos/417173/pexels-photo-417173.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260'
            ]

            axios.get(``)
            // async function getCategories() {
            //   let test = await (computerVision.analyzeImage(fakeArray[0])).categories
            //   console.log(test)
            // }
            // getCategories().then(res.redirect('/'))

            // const myPromise = new Promise((resolve, reject) => {
            //   let test = computerVision(fakeArray[1])
            //   console.log(test)
            //   if (test) { resolve(test) } else { reject(err) }
            // })

            // myPromise.then(res.redirect('/')).catch(console.log(err))

            // computerVision(fakeArray[0])
            // computerVision(fakeArray[1])
            // computerVision(fakeArray[2])

            // res.redirect('/')

            // async function getCategories() {
            //   let test = await computerVision(fakeArray[0])
            //   console.log('test: ' + test)
            // }

            // getCategories().then(() => {
            //   console.log(userProfile)
            //   res.redirect('/')
            // })





            // getCategories()

            // var count = 0

            // while  (count < userProfile.images) {
            //   computerVision(userProfile[count], count)
            // }

            console.log(userProfile)
            res.redirect('/')
          })
        })
      })


      // var imgPath =
      //   protocol + '://' + host + '/userImages/' + images[0].filename
      // // result.images.forEach(function (image) {
      // // console.log(image.path)

      // computerVision(imgPath)
    }
  )
}
