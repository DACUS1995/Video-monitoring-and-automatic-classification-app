'use strict';

const ElectronRendererSocketHandler = require("./ElectronRendererSocketHandler.js");
const {ipcRenderer} = require("electron");
const SimplePeer  = require("simple-peer");
const remoteWebRTC = require("./remoteWebRTC.js");

// Messages that are related with webRTC are handled in remoteWebRTC
ipcRenderer.on("message-from-centralApp", (event, data) => {
	ElectronRendererSocketHandler.handleIncomingMessage(data);
});

window.addEventListener('load', function (evt) {
	let elVideo = document.getElementById('remoteVideo');
	let stream;
	let startTime;

	navigator.getUserMedia({audio: false, video: true},
		function (localStream) {
			elVideo.src = window.URL.createObjectURL(localStream);

			let objRemoteWebRTC = new remoteWebRTC(localStream, SimplePeer, ipcRenderer);

			setTimeout(() => {
				objRemoteWebRTC.createConnection();
			}, 3500);
		},
		function (err) {
			console.log('The following error occurred: ' + err.name)
		}
	);
})