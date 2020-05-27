var db = require('../models')
var multer = require('multer')
var storage = multer.diskStorage({
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
    const name = req.body.name
    const images = req.files
    const lang = !!req.body['lang-pref']
    const culture = !!req.body['culture-pref']
    const ip = req.headers['x-forwarded-for'] || req.ip
    const langSetting = req.headers['accept-language']

    const result = {
      name: name,
      images: images,
      lang: lang,
      culture: culture,
      ip: ip,
      langSetting: langSetting
    }

    result.images.forEach(function (image) {
      console.log(image.path)
    })

    console.log(result)

    res.redirect('/')
  })
}
