const WebSocket = require('ws');
const SocketHandle = require("./SocketHandle.js");
const Connection = require("./Connection.js");

// The remoteApp must be given the centralApp local adress as 
// argument when launching
let strRemoteAdress = process.argv[2];

const ws = new WebSocket(strRemoteAdress);

ws.on('open', function open() {

	// Could be used to make sure the connection is alive
	let interval = setInterval(() => {
		ws.send(
			SocketHandle.makeMessage("heartbeat", "heartbeat")
		);
	}, 5000)

	// Prepare Signaling and Create the WebRTC connection to Main App
	let nStationID = SocketHandle.generateStationID();
	let Connection = new Connection(ws, nStationID);

	Connection.makeRTCConnection();
});

ws.on('message', function incoming(data) {
	SocketHandle.handleIncomingMessage(data);
});




// Template of mesage JSON
// {
// 	subject: "subject",
// 	message: "message"
// }