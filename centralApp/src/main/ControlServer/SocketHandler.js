
class SocketHandler{
    constructor(){}

    static makeMessage(strSubject, strMessage){
        return JSON.stringify(
            {
                subject: strSubject,
                message: strMessage
            }
        );
    }

    static decodeMessage(strStringObject){
        let objDecodedMessage = JSON.parse(strStringObject);

        return objDecodedMessage;
    }

    static handleIncomingMessage(strStringObject){
        let objDecodedMessage = SocketHandler.decodeMessage(strStringObject);

        if(objDecodedMessage.subject == "message")
        {
            // Handle the message acordingly
            console.log("Message from remote: " + objDecodedMessage.message);
            mainWindow.webContents.send('message-from-remote', objDecodedMessage.message)
        }

        if(objDecodedMessage.subject == "setupConnection")
        {
            mainWindow.weContents.send('new-connection-setup', objDecodedMessage.message);
            arrConnections.push(objDecodedMessage.message);
        }

        // Connection health check
        if(objDecodedMessage.subject == "heartbeat")
        {
            //TODO: Implement counter that must be reseted to make sure the connection is alive
        }
    }
}

console.log("Here");
export default SocketHandler;