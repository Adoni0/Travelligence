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
      interests_details: {
        food: 0,
        animal: 0,
        drink: 0,
        building: 0,
        plant: 0,
        outdoor_mountain: 0,
        outdoor_city: 0,
        outdoor_field: 0,
        outdoor_water: 0,
        outdoor_oceanbeach: 0,
        outdoor_stonerock: 0
      },
      interests: '',
      associatedCulture: [],
      ip: ip,
      langSetting: langSetting,
      wealthDetails: {
        age: 0,
        medianIncome: 0
      },
      wealth: 0,
      // geo: geoip.lookup('207.97.227.239') // this.ip
      geo: geoip.lookup(ip)
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

          var fakeArray = ['https://images.pexels.com/photos/417173/pexels-photo-417173.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940', 'https://images.pexels.com/photos/4827/nature-forest-trees-fog.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260', 'https://images.pexels.com/photos/417173/pexels-photo-417173.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260']

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
                url: userProfile.images[count]
                // url: fakeArray[count]
              },
              json: true
            }, function (error, response, body) {
              if (error) throw new Error(error);

              if (body.categories[0].name.split('_')[0] === 'outdoor') {
                userProfile.interests_details[body.categories[0].name] += .34
              } else if (userProfile.interests_details[body.categories[0].name.split('_')[0]] === 0) {
                userProfile.interests_details[body.categories[0].name.split('_')[0]] += .34
              }
            })

            if (count < userProfile.images.length - 1) {
              count++
              getCategories()
            } else {

              /// LOGIC TO SELECT A COUNTRY ======================================
              let selectedCountries

              // Filter by Wealth
              let wealth
              if (userProfile.wealth <= .34) {
                wealth = 'economy'
              } else if (userProfile.wealth <= .67) {
                wealth = 'moderate'
              } else {
                wealth = 'luxury'
              }

              db.Country.findAll({
                where: { cost: wealth }
              }).then((allCountries) => {
                selectedCountries = allCountries

                console.log('selectedCountries 1============')
                console.log(allCountries)
                console.log(selectedCountries)

                // Filter by Interest
                ////// EX) Country.categories: 'building, outdoor_oceanbeach, outdoor_water'
                if (selectedCountries.length > 1) {
                  selectedCountries.forEach((country, index) => {
                    const countryCategoriesArr = country.categories.split(', ')

                    // // Modify category name in countryCategoriesArr if it's outdoor_ 
                    // countryCategoriesArr.map((category) => {
                    //     if (category.includes('outdoor')) {
                    //         category = category.split('_')[1]
                    //     }
                    //     return category
                    // })

                    if (!countryCategoriesArr.includes(userProfile.interests)) {
                      selectedCountries.splice(index, 1)
                    }
                  })
                }

                // Filter by Language
                ///// Willing to go somewhere you don't speak the language?
                ///// EX) langSetting: 'en-US,en;q=0.9,ja;q=0.8'
                ///// EX) countryLangs: 'en, ja'
                if (selectedCountries.length > 1 && !userProfile.lang) {  // if the user says No, remove all countries whose languages don't match the user's langSetting from selectedCountries array
                  const langSettingArrTemp = userProfile.langSetting.split(',')
                  const langSettingArr = langSettingArrTemp.map((lang) => {
                    // Return only first 2 letters of language (en-US => en)
                    return lang.slice(0, 2).toLowerCase()
                  })
                  selectedCountries.forEach((country, index) => {
                    let includeLang = false
                    const countryLangs = country.lang.split(', ').map(lang => lang.toLowerCase())
                    langSettingArr.forEach(langSetting => {
                      if (countryLangs.includes(langSetting)) {
                        includeLang = true
                      }
                    })
                    if (!includeLang) {
                      selectedCountries.splice(index, 1)
                    }
                  })
                }

                // Filter by Culture
                ///// Would you prefer to explore your own culture?
                ///// EX) associatedCulture: [ 'JP', '', 'GB' ]
                if (selectedCountries.length > 1 && userProfile.culture) {  // if the user says Yes, remove all countries which don't match the user's culture
                  const associatedCultureArr = userProfile.associatedCulture.map((cul) => cul.toLowerCase())
                  selectedCountries.forEach((country, index) => {
                    if (!associatedCultureArr.includes(country.code.toLowerCase())) {
                      selectedCountries.splice(index, 1)
                    }
                  })
                }
                console.log('selectedCountries final============')
                console.log(selectedCountries)

                // Choose a country from selected countries array randomly (if there is more than one contry in the array)
                const destinationDataObj = selectedCountries.length === 1 ? selectedCountries[0] : selectedCountries[Math.floor(Math.random() * selectedCountries.length)]

                // res.json(destinationDataObj)

                console.log('destinationDataObj=====================')
                console.log(destinationDataObj)

                const destinationName = destinationDataObj.name
                const destinationImage = destinationDataObj.image

                const imagePath = '/images/countries/'
                const countryData = {
                  countryName: destinationName,
                  countryImage: `${imagePath}${destinationImage}`
                }
                console.log(countryData)


                setTimeout(() => {
                  var highestInterest = 0
                  for (interests in userProfile.interests_details) {
                    if (userProfile.interests_details[interests] > highestInterest) {
                      userProfile.interests = interests
                      console.log('The highest interest is: ' + interests)
                      highestInterest = userProfile.interests_details[interests]
                    }
                  }

                  console.log(userProfile)

                  res.render('index', {
                    countryData: countryData
                  })
                }, 5000)
              })
              /// LOGIC TO SELECT A COUNTRY END!!!! ======================================
            }
          }
          getCategories()
        })
      })
    })
  })
}

