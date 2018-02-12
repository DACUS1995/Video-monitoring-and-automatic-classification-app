const WebSocket = require('ws');
const SocketHandler = require("./SocketHandler.js");
const Connection = require("./Connection.js");

// The remoteApp must be given the centralApp local adress as 
// argument when launching
let strRemoteAdress = process.argv[2];

const ws = new WebSocket(strRemoteAdress);

ws.on('open', function open() {

	// Could be used to make sure the connection is alive
	let interval = setInterval(() => {
		console.log("Heartbeat sent");
		
		ws.send(
			SocketHandler.makeMessage("heartbeat", "heartbeat")
		);	
	}, 5000);

	// Prepare Signaling and Create the WebRTC connection to Main App
	let nStationID = SocketHandler.generateStationID();
	let connection = new Connection(ws, nStationID);

	connection.sendIdentificationData();
	connection.makeRTCConnection();
});

ws.on('message', function incoming(data) {
	SocketHandler.handleIncomingMessage(data);
});


// Template of mesage JSON
// {
// 	subject: "subject",
// 	message: "message"
// }