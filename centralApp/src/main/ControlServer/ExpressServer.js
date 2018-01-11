(function () {
  'use strict'

  const WebSocket = require('ws')
  const http = require('http')

  let express = require('express')
  let path = require('path')
  let bodyParser = require('body-parser')
  // var routes = require('routes')

  let app = express()
  let publicPath = path.resolve(__dirname, '../dist')
  // let port = 3000

  // point for static assets
  app.use(express.static(publicPath))

  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({
    extended: true
  }))

  // app.use('/', routes)

  // GET method route
  app.get('/', function (req, res) {
    res.send('GET request to the homepage')
  })

  // POST method route
  app.post('/', function (req, res) {
    res.send('POST request to the homepage')
  })

  // Change the 404 message modifing the middleware
  app.use(function (req, res, next) {
    res.status(404).send("Sorry, that route doesn't exist. Have a nice day :)")
  })

  const server = http.createServer(app)
  const wss = new WebSocket.Server({ server })
  
  wss.on('connection', function connection (ws, req) {
    // const location = url.parse(req.url, true)

    var interval = setInterval(function(str1, str2) {
      console.log(str1 + " " + str2);
    }, 1000, "Hello.", "How are you?");

    ws.on('message', function incoming (message) {
      console.log('received: %s', message)
    })
    ws.send('something')
  })

  server.listen(8080, function listening () {
    console.log('Listening on %d', server.address().port)
  })

  // let server = app.listen(port, function () {
  //   console.log('Express server listening on port ' + server.address().port)

  //   // create the WebSocket server
  //   let ws = new WebSocket({server: server})
  //   console.log('Upgraded to ws on port ' + server.address().port)
  //   ws.on('connection', function (client) {
  //   })
  // })

  module.exports = app
}())
