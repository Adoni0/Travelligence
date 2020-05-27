// var geoip = require('geoip-lite')
// var MediumIncome = require('./mediumIncome.js')
// var db = require('./models')
// var express = require('express')
// var axios = require('axios')

// var router = express()

// module.exports = function () {
//   var ip = '207.97.227.239'
//   var geo = geoip.lookup(ip)
//   // console.log(geo);

//   for (var i = 0; i < MediumIncome.length; i++) {
//     if (geo.region === MediumIncome[i].location) {
//       // console.log(MediumIncome[i].income)
//       var income = MediumIncome[i].income

//       // find age of user express as a decimal
//       // add two decimals together and divide by 2 to find average
//       // var age = 0.26;
//       axios({
//         method: 'get',
//         url: 'https://api.agify.io?name=' + $('#user-name')
//       })
//         .then(function (response) {
//           var age = response.age

//           var wealth = (income + age) / 2
//           console.log(wealth) // wealth decimal
//         })

//     } else {
//       console.log('Could not find your state')
//     };
//   };

//   router.post('/', function (req, res) {
//     db.Profile.create({
//       location: geo.region,
//       wealth: wealth,

//       where: {
//         id: req.body.id // have to give value of {{id}} to section of handlebars
//       }

//     }).catch(function (error) {
//       if (error) throw error
//     })
//   })

// }
