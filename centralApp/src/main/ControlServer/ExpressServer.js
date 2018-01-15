

module.exports = 
function (ipcMain, mainWindow)  {
	'use strict'
	
	const WebSocket = require('ws')
	const http = require('http')
	const express = require('express')
	
	const path = require('path')
	const bodyParser = require('body-parser')
	const SocketHandle = require("./SocketHandle.js");
	// var routes = require('routes')


	let app = express()
	let publicPath = path.resolve(__dirname, '../dist')
	let port = 3000

	// point for static assets
	app.use(express.static(publicPath))

	app.use(bodyParser.json())
	app.use(bodyParser.urlencoded({
		extended: true
	}))

	// Create WebSockets upgrade
	const server = http.createServer(app)
	const wss = new WebSocket.Server({ server })
	
	wss.on('connection', function connection (ws, req) {
		console.log("ws - connection established with: " + req.connection.remoteAddress)

		ws.on('message', function incoming (message) {
			SocketHandle.handleIncomingMessage(message)
		})

	})

	server.listen(port, function listening () {
		console.log('Listening on %d', server.address().port)
	})
}

 