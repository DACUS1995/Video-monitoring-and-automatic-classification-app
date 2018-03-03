class SocketHandlerBase{
    /**
     * 
     */
    construct(mainWindow)
    {
        
    }

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
     * Decode received message from remote station
     * 
     * @param {string} strStringObject 
     */
    static decodeMessage(strStringObject)
    {
        let objDecodedMessage = JSON.parse(strStringObject);

        return objDecodedMessage;
    }

    /**
     * Checks the subject of the message and acts accordingly
     * 
     * @param {string} strStringObject 
     */
    handleIncomingMessage(strStringObject)
    {
        let objDecodedMessage = SocketHandlerBase.decodeMessage(strStringObject);

        if(objDecodedMessage.subject == "message")
        {
            // Handle the message acordingly
            console.log("Message from main: " + objDecodedMessage.message);
            this.mainWindow.webContents.send('message-from-centralApp', objDecodedMessage);
        }

        if(objDecodedMessage.subject == "first-message")
        {
            this.mainWindow.webContents.send("message-from-centralApp", objDecodedMessage)
        }
    }
}

export default SocketHandlerBase;