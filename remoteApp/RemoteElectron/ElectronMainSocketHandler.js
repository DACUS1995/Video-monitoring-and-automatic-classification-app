class ElectronMainSocketHandler{
    /**
     * 
     * @param {*} mainWindow 
     * @param {*} ipcMain
     * @param {*} ws
     */
    constructor(mainWindow, ipcMain, ws)
    {
        this.mainWindow = mainWindow;
        this.ipcMain = ipcMain;
        this.ws = ws;
        console.log("Constructed ElectronMainSocketHandler");
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
        try
        {
            let objDecodedMessage = ElectronMainSocketHandler.decodeMessage(strStringObject);

            if(!this.mainWindow)
            {
                throw new Error(`Error: mainWindow object is not initialised`);
            }
    
            if(objDecodedMessage.subject == "message")
            {
                // Handle the message acordingly
                console.log("Message from main: " + objDecodedMessage.message);
                this.mainWindow.webContents.send('message-from-centralApp', objDecodedMessage);
            }
    
            if(objDecodedMessage.subject == "first-message")
            {
                console.log(`(Subject ${objDecodedMessage.subject}): ${objDecodedMessage.message}`);
                this.mainWindow.webContents.send("message-from-centralApp", objDecodedMessage)
            }

            if(objDecodedMessage.subject == "webRTC_Data")
            {
                // console.log(`(Subject ${objDecodedMessage.subject}): ${objDecodedMessage.message}`);
                this.mainWindow.webContents.send("webRTC_Data", objDecodedMessage)
            }
        }
        catch(Error)
        {
            console.log(Error);
        }
    }

    /**
     * Checks the subject of the message and acts accordingly just like
     * "handleIncomingMessage", but the raw message object comes from 
     * ipcMain(from renderer process)
     * 
     * @param {object} strStringObject 
     */
    handleIpcMainIncomingMessage(strStringObject)
    {
        let objDecodedMessage = ElectronMainSocketHandler.decodeMessage(strStringObject);

        if(objDecodedMessage.subject == "webRTC_Data")
        {
            console.log("webRTC_Data in ElectronMainSocketHandler");
            this.ws.send(
                ElectronMainSocketHandler.makeMessage(objDecodedMessage.subject, objDecodedMessage.message)
            );
        }
    }
}

module.exports = ElectronMainSocketHandler;