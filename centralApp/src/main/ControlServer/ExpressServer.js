(function () {
  'use strict'

  var express = require('express')
  var path = require('path')
  var bodyParser = require('body-parser')
  var routes = require('routes')

  var app = express()
  var publicPath = path.resolve(__dirname, '../dist')
  var port = 8888

  // point for static assets
  app.use(express.static(publicPath))

  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({
    extended: true
  }))

  app.use('/', routes)

  // GET method route
  app.get('/', function (req, res) {
    res.send('GET request to the homepage')
  })

  // POST method route
  app.post('/', function (req, res) {
    res.send('POST request to the homepage')
  })

  var server = app.listen(port, function () {
    console.log('Express server listening on port ' + server.address().port)
  })

  module.exports = app
}())
