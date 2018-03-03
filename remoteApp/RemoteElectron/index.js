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

			let objRemoteWebRTC = new remoteWebRTC(localStream, SimplePeer , ipcRenderer);
			setTimeout(() => {
				objRemoteWebRTC.createConnection();
			}, 3500);

			// let servers = null;
			// pc = new webkitRTCPeerConnection(servers);
			// pc.addStream(localStream);

			// stream = localStream;
		},
		function (err) {
			console.log('The following error occurred: ' + err.name)
		}
	);

	// function maybeCreateStream() {
	// 	if (stream) {
	// 		return;
	// 	}
	// 	if (elVideo.captureStream) {
	// 		stream = elVideo.captureStream();
	// 		console.log('Captured stream with captureStream');
	// 		call();
	// 	} else if (elVideo.mozCaptureStream) {
	// 		stream = elVideo.mozCaptureStream();
	// 		console.log('Captured stream with mozCaptureStream()');
	// 	  call();
	// 	} else {
	// 		trace('captureStream() not supported');
	// 	}
	// }

	// elVideo.oncanplay = maybeCreateStream;

	// if (leftVideo.readyState >= 3) {
	// 	maybeCreateStream();
	// }

	// function call() {
	// 	trace('Starting call');
	// 	startTime = window.performance.now();

	// 	let videoTracks = stream.getVideoTracks();
	// 	let audioTracks = stream.getAudioTracks();
	// 	if (videoTracks.length > 0) {
	// 	  trace('Using video device: ' + videoTracks[0].label);
	// 	}
	// 	if (audioTracks.length > 0) {
	// 	  trace('Using audio device: ' + audioTracks[0].label);
	// 	}
	// 	let servers = null;
	// 	pc1 = new RTCPeerConnection(servers);
	// 	trace('Created local peer connection object pc1');
	// 	pc1.onicecandidate = function(e) {
	// 		onIceCandidate(pc1, e);
	// 	};
	// 	pc2 = new RTCPeerConnection(servers);
	// 	trace('Created remote peer connection object pc2');
	// 	pc2.onicecandidate = function(e) {
	// 		onIceCandidate(pc2, e);
	// 	};
	// 	pc1.oniceconnectionstatechange = function(e) {
	// 		onIceStateChange(pc1, e);
	// 	};
	// 	pc2.oniceconnectionstatechange = function(e) {
	// 		onIceStateChange(pc2, e);
	// 	};
	// 	pc2.ontrack = gotRemoteStream;
	  
	// 	stream.getTracks().forEach(
	// 		function(track) {
	// 			pc1.addTrack(
	// 				track,
	// 		  		stream
	// 			);
	// 		}
	// 	);
	// 	trace('Added local stream to pc1');
	  
	// 	trace('pc1 createOffer start');
	// 	pc1.createOffer(onCreateOfferSuccess, onCreateSessionDescriptionError, offerOptions);
	//   }
})