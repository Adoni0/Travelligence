
'use strict'

require('dotenv').config()
const async = require('async')
const fs = require('fs')
const path = require('path')
const createReadStream = require('fs').createReadStream
const sleep = require('util').promisify(setTimeout)
const ComputerVisionClient = require('@azure/cognitiveservices-computervision').ComputerVisionClient
const ApiKeyCredentials = require('@azure/ms-rest-js').ApiKeyCredentials
// </snippet_imports>

/**
 * Computer Vision example
 *
 * Prerequisites:
 *  - Node.js 8.0+
 *  - Install the Computer Vision SDK: npm i @azure/cognitiveservices-computervision
 *       NPM package: https://www.npmjs.com/package/@azure/cognitiveservices-computervision
 *  - Install the 'ms-rest-js' package: npm i @azure/ms-rest-js
 *  - Install the 'async' package: npm i async
 *  - Set your subscription key and endpoint into your environment variables
 *  - The DESCRIBE IMAGE example uses a local image, download and place in your working folder:
 *    https://moderatorsampleimages.blob.core.windows.net/samples/sample1.png
 *  - The BATCH READ FILE example uses a local image, download and place in your working folder:
 *    https: //github.com/Azure-Samples/cognitive-services-sample-data-files/blob/master/ComputerVision/Images/handwritten_text.jpg
 *
 * Resources:
 *  - Node SDK: https://docs.microsoft.com/en-us/javascript/api/azure-cognitiveservices-computervision/?view=azure-node-latest
 *  - Documentation: https://docs.microsoft.com/en-us/azure/cognitive-services/computer-vision/
 *  - API v2.0: https://westus.dev.cognitive.microsoft.com/docs/services/5adf991815e1060e6355ad44/operations/56f91f2e778daf14a499e1fa
 *
 * Examples included in this quickstart:
 * Authenticate, Describe Image, Detect Faces, Detect Objects, Detect Tags, Detect Type,
 * Detect Category, Detect Brand, Detect Color Scheme, Detect Domain-specific Content, Detect Adult Content
 * Generate Thumbnail, Batch Read File, Recognize Text (OCR), Recognize Printed & Handwritten Text.
 */

// <snippet_vars>

const key = process.env.KEY
const endpoint = process.env.ENDPOINT
if (!key) { throw new Error(key, endpoint) }

const computerVisionClient = new ComputerVisionClient(
  new ApiKeyCredentials({ inHeader: { 'Ocp-Apim-Subscription-Key': key } }), endpoint)

module.exports = function computerVision(file) {
  async.series([
    async function () {
      // Formats the image categories
      function formatCategories(categories) {
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
