
'use strict'

require('dotenv').config()
const async = require('async')
const fs = require('fs')
const path = require('path')
const createReadStream = require('fs').createReadStream
const sleep = require('util').promisify(setTimeout)
const ComputerVisionClient = require('@azure/cognitiveservices-computervision').ComputerVisionClient
const ApiKeyCredentials = require('@azure/ms-rest-js').ApiKeyCredentials


const key = process.env.KEY
const endpoint = process.env.ENDPOINT
if (!key) { throw new Error(key, endpoint) }

const computerVisionClient = new ComputerVisionClient(
  new ApiKeyCredentials({ inHeader: { 'Ocp-Apim-Subscription-Key': key } }), endpoint)

module.exports = function computerVision (file) {
  async.series([
    async function () {
      // Formats the image categories
      function formatCategories (categories) {
        categories.sort((a, b) => b.score - a.score)
        return categories.map(cat => `${cat.name} (${cat.score.toFixed(2)})`).join(', ')
      }
      // outdoor_ indoor_ food_ drink_ building_ animal_ plant_. If not default destination
      // const categoryURLImage = 'https://moderatorsampleimages.blob.core.windows.net/samples/sample16.png';
      const categoryURLImage = file
      console.log(categoryURLImage)

      // Analyze URL image
      console.log('Analyzing category in image...', categoryURLImage.split('/').pop())
      const categories = (await computerVisionClient.analyzeImage(categoryURLImage)).categories
      console.log(`Categories: ${formatCategories(categories)}`)
      return categories
    },
    function () {
      return new Promise((resolve) => {
        resolve()
      })
    }
  ], (err) => {
    throw (err)
  })
}

// computerVision()
