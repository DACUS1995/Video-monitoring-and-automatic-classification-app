'use strict';

const ElectronRendererSocketHandler = require("./ElectronRendererSocketHandler.js");
const { ipcRenderer } = require("electron");
const SimplePeer  = require("simple-peer");
const remoteWebRTC = require("./remoteWebRTC.js");
const TFjsClassifier = require("./classifier/TFjsClassifier");
const GraphicRouting = require("./GraphicRouting/GraphicRouting");

// Messages that are related with webRTC are handled in remoteWebRTC
ipcRenderer.on("message-from-centralApp", (event, data) => {
	ElectronRendererSocketHandler.handleIncomingMessage(data);
});

ipcRenderer.on("classification_results", (event, data) => {
	ElectronRendererSocketHandler.handleIncomingMessage(data);	
});

ipcRenderer.on("updateViewConfig", (event, data) => {
	ElectronRendererSocketHandler.handleIncomingMessage(data);
});

window.addEventListener('load', function (evt) {
	let elVideo = document.getElementById('remoteVideo');
	let stream;
	let startTime;

	navigator.mediaDevices.enumerateDevices()
	.then((arrDevices) => {
		let objVideoConstraints = null;

		for(let device of arrDevices)
		{
			

			// Windows only and only for external classification process
			if(device.label == "Multisplitter Video Source")
			{
				objVideoConstraints = {
					deviceId: {exact: device.deviceId}
				};
				break;
			}
		}

		if(objVideoConstraints == null)
		{
			// throw new Error("Multisplitter Video Source is not available");
		}
		
		navigator.mediaDevices.getUserMedia({audio: false, video: true /*video: objVideoConstraints*/}) 
		.then(function (localStream) {
			elVideo.src = window.URL.createObjectURL(localStream);
			console.log(`Video Url: ${elVideo.src}`);
	
			let objRemoteWebRTC = new remoteWebRTC(localStream, SimplePeer, ipcRenderer);
	
			setTimeout(() => {
				objRemoteWebRTC.createConnection();
			}, 3500);
		})
		.catch(function (err) {
			console.log('The following error occurred: ' + err.name)
		})
	});

	// Pass the elDivInstructionContainer to the correct data classfier handlers
	const elDivInstructionContainer = document.getElementById("instructions-container");
	const objGraphicRouter = new GraphicRouting(elDivInstructionContainer);

	const objTFjsClassifier = new TFjsClassifier(elVideo, objGraphicRouter);
	objTFjsClassifier.runClassifier();

})