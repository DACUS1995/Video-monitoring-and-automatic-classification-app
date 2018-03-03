'use strict';

class remoteWebRTC{
    /**
     * 
     * @param {*} stream 
     * @param {*} SimplePeer  
     * @param {*} ipcRenderer
     */
    constructor(stream, SimplePeer, ipcRenderer)
    {
        this.stream = stream;
        this.SimplePeer  = SimplePeer ;
        this.ipcRenderer = ipcRenderer;
        console.log("remoteWebRTC object constructed");
    }

    /**
     * Create an object ready to be sent via ws
     * 
     * @param {string} strSubject 
     * @param {string} strMessage 
     */
    static makeMessage(strSubject, strMessage)
    {
        return JSON.stringify(
            {
                subject: strSubject,
                message: strMessage
            }
        );
    }

    /**
     * 
     */
    createConnection()
    {
        console.log("WebRTC connection is being created...");
        let SimplePeer = this.SimplePeer ;
        let peer1 = new SimplePeer ({initiator: true, stream: this.stream});

        peer1.on("signal", (data) => {
            // Get "data" to the main app via sockets
            console.log("signal");
            try
            {
                if(!this.ipcRenderer)
                {
                    throw new Error("ipcRenderer is empty");
                }

                this.ipcRenderer.send("message", remoteWebRTC.makeMessage("webRTC_Data", data));
            }
            catch(Error)
            {
                console.log(Error);
            }

        });

        this.ipcRenderer.on("webRTC_Data", (event, data) => {
            console.log("Signal on peer1 from peer2");
            peer1.signal(data.message);
        });
    }
}

module.exports = remoteWebRTC;