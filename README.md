# blue-project-2
Travelligence- A Travel Vacation app

This project is travel application for people who can’t decide where to take their next vacation. The application prompts the user to fill out a simple sign up form and our algorithm utilizes data from the users location, estimated age, estimated culture, and a few uploaded photos to recommend a country to visit.

This App incorporates Javascript, Express, Sequelize, Node Js, Handlebars, passport and geoip-lite npm packages, agify.io, nationalize.io, genderize.io and Microsoft Computer Vision API

![](travelform.gif)

Computer Vision

Microsoft Computer Vision analyzes the users uploaded images and extracts meta information about the image. We use this information to place the image into a category (outdoor_city, outdoor_scenic, food, animal, etc.) in which a group of countries will share.  This is an important aspect of our algorithm to narrow down your place of travel.

NPM package geoip-lite

This npm package grabs the ip address from the users computer, we use this as part of our algorithm to recored the users state of residence.

Agify.io, nationalize.io, and genderize.io

These API's estimate the users age, nationality, and gender based upon their first name. Age is used as part of the wealth algorithm, along with your states medium income, to pair you up with a country in a similar wealth bracket. 
