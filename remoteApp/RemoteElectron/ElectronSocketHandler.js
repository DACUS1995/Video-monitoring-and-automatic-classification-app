class ElectronSocketHandler{
    construct(){}

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

    }
}

export default ElectronSocketHandler;