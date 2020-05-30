var db = require('../models')

module.exports = function (app) {
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


      const selectedCountries = []

      app.post('/api/travelligence', function(req, res){

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
            where: {cost: wealth}
        }).then((allCountries) => {
            selectedCountries.push(allCountries) 

            // Filter by Interest
            ////// EX) Country.categories: 'building, outdoor_oceanbeach, outdoor_water'
            if (selectedCountries.length > 1) {
                selectedCountries.forEach((country, index) => {
                    const countryCategoriesArr = country.categories.split(', ')
                    if (!countryCategoriesArr.includes(userProfile.interest)) {
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
                    const countryLangs = country.lang.split(', ').map(lang => lang.toLowerCase())
                    if (!countryLangs.includes(langSetting)) {
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
        })


        // Choose a country from selected countries array randomly (if there is more than one contry in the array)
        const destinationDataObj = selectedCountries.length === 1 ? selectedCountries[0] : selectedCountries[Math.floor(Math.random() * selectedCountries.length)]
    
    })
}




