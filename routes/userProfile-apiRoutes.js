var db = require('../models')

module.exports = function (app) {

}

// if (wealth <= 0.33333) {
//   // cost bracket = economy
//   db.Profile.update({
//     cost_bracket: 'Economy'
//   },
//   {
//     where: {
//       id: req.body.id
//     }
//   }
//   ).catch(function (error) {
//     if (error) throw error
//   })
// } else if (wealth <= 0.66666 && wealth > 0.33333) {
//   // cost bracket = moderate
//   db.Profile.update({
//     cost_bracket: 'Moderate'
//   },
//   {
//     where: {
//       id: req.body.id
//     }
//   }
//   ).catch(function (error) {
//     if (error) throw error
//   })
// } else {
//   // cost bracket = luxury
//   db.Profile.update({
//     cost_bracket: 'Luxury'
//   },
//   {
//     where: {
//       id: req.body.id
//     }
//   }
//   ).catch(function (error) {
//     if (error) throw error
//   })
// };
