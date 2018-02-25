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
    }

    makeRTCConnection()
    {
        /*
        * Steps:
        *
        * 1) Start local electron process
        * 2) Capture local media stream
        * 3) Create WRTC connection to the central app
        */

        const spawn = require('child_process').spawn;

        let params = `.\\RemoteElectron\\`;
        let options = { 
            silent: false,
            shell: true
        };

        const remoteElectronProcess = spawn(`electron`, [params], options);
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
}