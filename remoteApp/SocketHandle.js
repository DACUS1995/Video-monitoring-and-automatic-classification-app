module.exports = 
class SocketHandle
{
    constructor(){}

    static makeMessage(strSubject, strMessage)
    {
        return JSON.stringify(
            {
                subject: strSubject,
                message: strMessage
            }
        );
    }

    static decodeMessage(strStringObject)
    {
        let objDecodedMessage = JSON.parse(strStringObject);

        return objDecodedMessage;
    }

    static handleIncomingMessage(strStringObject)
    {
        let objDecodedMessage = SocketHandle.decodeMessage(strStringObject);

        if(objDecodedMessage.subject == "message")
        {
            // Handle the message acordingly
            console.log(objDecodedMessage.message);
        }
    }

    static generateStationID()
    {
        let min = 10;
        let max = 1000;
        
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusiv
    }
}