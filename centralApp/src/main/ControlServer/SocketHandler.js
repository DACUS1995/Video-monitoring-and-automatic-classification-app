class SocketHandler{
    constructor(mainWindow, arrConnections){
        this.mainWindow = mainWindow;
        this.arrConnections = arrConnections;
        this.stationID = null;
        this.timeoutID = null;
    }

    /**
     * Create an object ready to be sent via ws
     * 
     * @param {string} strSubject 
     * @param {string} strMessage 
     */
    static makeMessage(strSubject, strMessage){
        return JSON.stringify(
            {
                subject: strSubject,
                message: strMessage
            }
        );
    }


    /**
     * Decode received message from remote station
     * 
     * @param {string} strStringObject 
     */
    static decodeMessage(strStringObject){
        let objDecodedMessage = JSON.parse(strStringObject);

        return objDecodedMessage;
    }

    /**
     * Checks the subject of the message and acts accordingly
     * 
     * @param {string} strStringObject 
     */
    handleIncomingMessage(strStringObject){
        let objDecodedMessage = SocketHandler.decodeMessage(strStringObject);

        if(objDecodedMessage.subject == "message")
        {
            // Handle the message acordingly
            console.log("Message from remote: " + objDecodedMessage.message);
            this.mainWindow.webContents.send('message-from-remote', objDecodedMessage.message)
        }

        if(objDecodedMessage.subject == "setupConnection")
        {
            this.mainWindow.webContents.send('new-connection-setup', objDecodedMessage.message);

            // Make sure arrConnections exists in a reachable scope
            if(typeof this.arrConnections == "undefined") 
            {
                throw new Error("The arrConnections array cannot be found in reachable scope!");
            }

            this.arrConnections.push(objDecodedMessage.message);
            this.stationID = objDecodedMessage.message.stationId;
        }

        // Connection health check
        if(objDecodedMessage.subject == "heartbeat")
        {
            console.log("Heartbeat from remote station: " + this.stationID);

            if(this.timeoutID != null)
            {
                clearTimeout(this.timeoutID);
            }

            this.timeoutID = setTimeout(() => {
                console.log(`Remote station: ${this.stationID} disconnected`);
                this.removeDisconnectedStation();
            }, 10000);
        }

        // Use the existing Node process to broker the messages between the Electron processes     
        if(objDecodedMessage.subject == "remoteElectron")
        {
            console.log(`Message from remote electron process, station ${this.stationID}`);

            this.mainWindow.webContents.send("message-from-remoteElectron", objDecodedMessage.message);
        }

        // Message from python classification process
        if(objDecodedMessage.subject == "classification_results")
        {
            this.mainWindow.webContents.send(objDecodedMessage.subject, objDecodedMessage);
        }
    }

    /**
     * Executes the steps to remove a disconected station
     */
    removeDisconnectedStation()
    {
        for(let i = 0; i < this.arrConnections.length; i++)
        {
            if(this.arrConnections[i].stationID == this.stationID)
            {
                this.arrConnections.splice(i, 1);
                break;
            }
        }

        this.mainWindow.webContents.send('remote-disconected', this.stationID);
    }
}

export default SocketHandler;