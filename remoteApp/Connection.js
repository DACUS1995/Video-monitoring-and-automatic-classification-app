const os = require("os");
const Config = require("./Config.js");
const SocketHandler = require("./SocketHandler.js");
const path = require("path");

module.exports = 
class Connection
{
	// nStationID or strStationName
	/**
	 * @constructor
	 * @param {string} ws 
	 * @param {string} nStationID
	 * @param {Object} 
	 */
	constructor(ws, nStationID, objRemoteVideoClassifier)
	{
		this.ws = ws;
		this.nStationID = nStationID;
		this.objRemoteVideoClassifier = objRemoteVideoClassifier;
		this.strStationAdress = this.getNetworkAdress();
		this.remoteElectronProcess = null;

		this.remoteVideoClassifierProcces = null;
	}

	startVideoClassifier()
	{
		this.remoteVideoClassifierProcces = this.objRemoteVideoClassifier.spawnClassificationProcess();

		// It may take some time for the python process to start
		// so I use setInterval to check if the process handler was created
		// in order to set the listeners on the stdout
		let intervalID = setInterval(() => {
			if(this.remoteVideoClassifierProcces != null)
			{
				this.handleClassificationProcessData();
				clearInterval(intervalID);
			}
		}, 2000);
	}

    /**
     * Use this function to decide what to do with the
     * data that comes from stdout or from IPC from the
     * spawned procces that runs the classification model
	 * 
	 * Use ws to send data to centralApp
     */
    handleClassificationProcessData()
    {
		this.remoteVideoClassifierProcces.stdout.on("data", (data) => {
			// console.log(`---> Data from classification process: ${data}`);

			let parsedData = JSON.parse(data);

			// Send to mainApp
			this.ws.send(
				SocketHandler.makeMessage(parsedData.subject, parsedData.message)
			);

			// Send to remote Electron 
			// (we could route the message through main app because there is allready a connection available to the remote Electron main)

		});

		this.remoteVideoClassifierProcces.on("close", (code) => {
			console.log(`---> Classification process exited with code ${code}`);
		});
    }

	/**
	 * Create the RTC connection beetween the main and remote electron process 
	 */
	makeRTCConnection()
	{
		/*
		* Steps:
		*
		* 1) Start local electron process
		* 2) Capture local media stream
		* 3) Create WRTC connection to the central app
		*       - use for signaling the existing ws connection to create a new ws connection to comunicate between mainExpressApp and a remote express server 
		*       - the output from previous step must be interpreted and handled accordingly ("handleRemoteElectronMessaging") or not
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
	}

	/**
	 * Use this function to handle each message event from spawned child
	 * 
	 * @param {string} objData 
	 */
	handleRemoteElectronMessaging(objData)
	{
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