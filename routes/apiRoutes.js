var db = require('../models');
var multer = require('multer');
var upload = multer({ dest: 'public/userImages' });

module.exports = function (app) {
  app.post('/api/travelligence', upload.array('interests-images'), (req, res) => {
    const name = req.body.name;
    const images = req.files;
    const lang = !!req.body['lang-pref'];
    const culture = !!req.body['culture-pref'];
    const ip = req.headers['x-forwarded-for'] || req.ip;
    const langSetting = req.headers['accept-language'];

    const result = {
      name: name,
      images: images,
      lang: lang,
      culture: culture,
      ip: ip,
      langSetting: langSetting
    };

    console.log(result);

    res.redirect('/');
  });


}
