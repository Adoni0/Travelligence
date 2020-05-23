var geoip = require('geoip-lite')
var MediumIncome = require('./mediumIncome.js')

var ip = '207.97.227.239'
var geo = geoip.lookup(ip)

// console.log(geo);

for (var i = 0; i < MediumIncome.length; i++) {
  if (geo.region === MediumIncome[i].location) {
    // console.log(MediumIncome[i].income)
    var income = MediumIncome[i].income
    // find age of user express as a decimal
    // add two decimals together and divide by 2 to find average
    var age = 0.26
    console.log((income + age) / 2)
  }
};
