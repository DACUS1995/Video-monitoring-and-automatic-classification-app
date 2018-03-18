

module.exports = 
function (ipcMain, mainWindow)  {
	'use strict'
	
	const WebSocket = require('ws')
	const http = require('http')
	const express = require('express')
	
	const path = require('path')
	const bodyParser = require('body-parser')
	const ElectronMainSocketHandler = require("./ElectronMainSocketHandler.js");

	let app = express()
	let publicPath = path.resolve(__dirname, '../dist')
	let port = 4000

	// point for static assets
	app.use(express.static(publicPath))

	app.use(bodyParser.json())
	app.use(bodyParser.urlencoded({
		extended: true
	}));

	// Create WebSockets upgrade
	const server = http.createServer(app)
	const wss = new WebSocket.Server({ server })
	
	wss.on('connection', function connection (ws, req) {
		console.log("ws - connection established with: " + req.connection.remoteAddress);
		let connectionSocketHandler = new ElectronMainSocketHandler(mainWindow, ipcMain, ws);

		if(!ipcMain)
		{
			throw new Error("ipcMain is empty");
		}

		// Handle the messages that come from local electron render process
		ipcMain.on("message", (event, arg) => {
			console.log("Message from ipcMain");
			connectionSocketHandler.handleIpcMainIncomingMessage(arg);
		});

		// Handle the messages that come from remoteApp
		ws.on('message', function (rawMessage) {
			connectionSocketHandler.handleIncomingMessage(rawMessage)
		})

		ws.on('error', () => console.log('errored (Probably just a ws disconect)'));
	})

	server.listen(port, function listening () {
		console.log('Listening on port: %d', server.address().port)
	})
}

 