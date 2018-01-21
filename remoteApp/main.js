const WebSocket = require('ws');
const SocketHandle = require("./SocketHandle.js");
const Connection = require("./Connection.js");

const ws = new WebSocket('ws://localhost:3000');

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
});

ws.on('message', function incoming(data) {
	SocketHandle.handleIncomingMessage(data);
});




// Template of mesage JSON
// {
// 	subject: "subject",
// 	message: "message"
// }