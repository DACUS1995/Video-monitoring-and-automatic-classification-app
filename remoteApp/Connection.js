const os = require("os");
const Config = require("./Config.js");
const SocketHandler = require("./SocketHandler.js");

module.exports = 
class Connection
{
	// nStationID or strStationName
	/**
	 * @constructor
	 * @param {string} ws 
	 * @param {string} nStationID 
	 */
	constructor(ws, nStationID)
	{
		this.ws = ws;
		this.nStationID = nStationID;
		this.strStationAdress = this.getNetworkAdress();
		this.remoteElectronProcess = null;
	}

	/**
	 * Create the RTC connection beetween the main and remote electron process 
	 * 
	 * @param {object} objInstanceSocketHandler
	 */
	makeRTCConnection(objInstanceSocketHandler)
	{
		/*
		* Steps:
		*
		* 1) Start local electron process
		* 2) Capture local media stream
		* 3) Create WRTC connection to the central app
		*       - use for signaling the existing ws connection
		*       - to comunicate with the Electron process you must capture the stdout
		*       - the output from previous step must be interpreted and handled accordingly ("handleRemoteElectronMessaging")
		*/

		const spawn = require('child_process').spawn;

		let params = `.\\RemoteElectron\\`;
		let options = { 
			silent: false,
			shell: true,
			stdio: ['inherit', 'inherit', 'inherit']
		};

		const remoteElectronProcess = spawn(`electron`, [params], options);
		this.remoteElectronProcess = remoteElectronProcess;

		// objInstanceSocketHandler.setRefToRemoteElectronProcess(remoteElectronProcess);
		
		// remoteElectronProcess.on("message", (data) => {
		// 	handleRemoteElectronMessaging(data);
		// });
		// remoteElectronProcess.send("Hello Please");
	}

	/**
	 * Use this function to handle each message event from spawned child
	 * 
	 * @param {string} objData 
	 */
	handleRemoteElectronMessaging(objData)
	{
		// TODO stuff
		// In the electron process you should wrap the output stream in an object with subject and message to parse more easely
		let strSubject = objData.subject;
		let strMessage = objData.message;


		this.ws.send(
			SocketHandler.makeMessage(strSubject, strMessage)
		);
		// sendMessageFromRemoteElectron(strParsedMessage);
	}

	/**
	 * Returns the IPv4 address of the current remote instantiation
	 * 
	 * @returns{string} IPv4 address
	 */
	getNetworkAdress()
	{
		let objInterfaces = os.networkInterfaces();

		for(let strInterfaceLabel in objInterfaces)
		{
			for(let objInterface of objInterfaces[strInterfaceLabel])
			{
				if(objInterface.family == "IPv4" && objInterface.address != "127.0.0.1")
				{
					return objInterface.address;
				}
			}
		}
	}

	/**
	 * Send inital data to main app in order to register.
	 */
	sendIdentificationData()
	{
		let strSubject = "setupConnection";
		let strMessage = {
			address: this.strStationAdress,
			stationId: this.nStationID
		};

		this.ws.send(
			SocketHandler.makeMessage(strSubject, strMessage)
		);
	}

	/**
	 * Pass the messages from remoteElectron to the centralApp
	 * 
	 * @param {string} strMessage
	 */
	sendMessageFromRemoteElectron(strMessage)
	{
		let strSubject = "remoteElectron";

		this.ws.send(
			SocketHandler.makeMessage(strSubject, strMessage)
		);
	}
}