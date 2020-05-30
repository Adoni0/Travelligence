var db = require('../models')

module.exports = function (app) {
    app.post('/api/profile', function(req, res){
        db.Profile.create({
            name: userProfile.name,
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


      app.get('/api/profile', function(req, res){

        db.Profile.findAll().then((data) => {
            for(var i = 0; i < data.interests.length; i++){ //if interests is an array
                db.Country.findOne({
                    where: {categories: data.interests[i]}
                }).then((result) => {
                    res.json(result)
                })
            }
        })
        
        db.Profile.findAll().then((data) => {
            if(data.wealth <= .34){
                db.Country.findOne({
                    where: {cost: 'economy'}
                }).then((result) => {
                    res.json(result)
                })
            } else if (data.wealth <= .67){
                db.Country.findOne({
                    where: {cost: 'moderate'}
                }).then((result) => {
                    res.json(result)
                })
            } else{
                db.Country.findOne({
                    where: {cost: 'luxury'}
                }).then((result) => {
                    res.json(result)
                })
            }
        })
    
    })
}




