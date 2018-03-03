class ElectronRendererSocketHandler{
    constructor(){}

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
     * @param {string} objDecodedMessage 
     */
    static handleIncomingMessage(objDecodedMessage)
    {
        console.log(objDecodedMessage);
        if(objDecodedMessage.subject == "log")
        {
            console.log(objDecodedMessage.message);
        }

        if(objDecodedMessage.subject == "first-message")
        {
            console.log(objDecodedMessage.message);
        }

        // if(objDecodedMessage.subject == "webRTC_Data")
        // {
        //     console.log(objDecodedMessage.message);
        // }
    }
}

module.exports = ElectronRendererSocketHandler;