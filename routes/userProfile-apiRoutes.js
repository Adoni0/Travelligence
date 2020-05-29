var db = require('../models')

module.exports = function (app) {
    app.post('/api/profile', function(req, res){
        db.Profile.create({
            location: userProfile.geo.region,
            wealth: userProfile.wealth,
            culture: userProfile.culture,
            associatedCulture: userProfile.associatedCulture,
            language: userProfile.langSetting,
            interests: userProfile.images,
            somethingNew: userProfile.culture
        }).then(function(data){
            console.log(data);
        })
      })
}

