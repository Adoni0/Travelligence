# blue-project-2
Travelligence- A Travel Vacation app

This project is travel application for people who can’t decide where to take their next vacation. The application prompts the user to fill out a simple sign up form and our algorithm utilizes data from the users location, estimated age, estimated culture, and a few uploaded photos to recommend a country to visit.

This App incorporates Javascript, Express, Sequelize, Node Js, Handlebars, passport and geoip-lite npm packages, agify.io, nationalize.io, genderize.io and Microsoft Computer Vision API

![](travelform.gif)

Computer Vision

Microsoft Computer Vision analyzes the users uploaded images and extracts meta information about the image. We use this information to place the image into a category (outdoor_city, outdoor_scenic, food, animal, etc.) in which a group of countries will share.  This is an important aspect of our algorithm to narrow down your place of travel.
