const WebSocket = require('ws');
const SocketHandle = require("./SocketHandle.js");

const ws = new WebSocket('ws://localhost:3000');

ws.on('open', function open() {

	// Could be used to make sure the connection is alive
	let interval = setInterval(() => {
		ws.send(
			SocketHandle.makeMessage("heartbeat", "heartbeat")
		);
	}, 5000)
});

ws.on('message', function incoming(data) {
	SocketHandle.handleIncomingMessage(data);
});




// Template of mesage JSON
// {
// 	subject: "subject",
// 	message: "message"
// }