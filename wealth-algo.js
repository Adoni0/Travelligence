var geoip = require('geoip-lite')
var MediumIncome = require('./mediumIncome.js')
var db = require('./models')

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
    var wealth = (income + age) / 2
    console.log(wealth) // wealth decimal
  } else {
    console.log('Could not find your state')
  }
};

if (wealth <= 0.33333) {
  // cost bracket = economy
  db.Profile.update({
    cost_bracket: 'Economy'
  },
  {
    where: {
      id: require.body.id
    }
  }
  ).catch(function (error) {
    if (error) throw error
  })
} else if (wealth <= 0.66666 && wealth > 0.33333) {
  // cost bracket = moderate
  db.Profile.update({
    cost_bracket: 'Moderate'
  },
  {
    where: {
      id: require.body.id
    }
  }
  ).catch(function (error) {
    if (error) throw error
  })
} else {
  // cost bracket = luxury
  db.Profile.update({
    cost_bracket: 'Luxury'
  },
  {
    where: {
      id: require.body.id
    }
  }
  ).catch(function (error) {
    if (error) throw error
  })
}

db.Profile.create({
  location: geo.region,
  wealth: wealth,

  where: {
    id: require.body.id // have to give value of {{id}} to section of handlebars
  }

}).catch(function (error) {
  if (error) throw error
})
