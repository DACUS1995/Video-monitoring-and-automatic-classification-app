module.exports = 
class utils{
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
        let objDecodedMessage = utils.decodeMessage(strStringObject);

        if(objDecodedMessage.subject == "message")
        {
            // Handle the message acordingly
            console.log(objDecodedMessage.message);
        }
    }
}