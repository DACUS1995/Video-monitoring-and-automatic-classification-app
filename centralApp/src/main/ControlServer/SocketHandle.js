
class SocketHandle{
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
        let objDecodedMessage = SocketHandle.decodeMessage(strStringObject);

        if(objDecodedMessage.subject == "message")
        {
            // Handle the message acordingly
            console.log("Message from remote: " + objDecodedMessage.message);
            mainWindow.webContents.send('message-from-remote', objDecodedMessage.message)
        }
    }
}

export default SocketHandle;