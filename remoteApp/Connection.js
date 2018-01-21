const os = require("os");

module.exports = 
class Connection
{
    // nStationID or strStationName
    constructor(ws, nStationID)
    {
        this.ws = ws;
        this.nStationID = nStationID;
        this.strStationAdress = this.getNetworkAdress();
    };

    makeRTCConnection()
    {
        // TODO implement shit and stuff
    }

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
}