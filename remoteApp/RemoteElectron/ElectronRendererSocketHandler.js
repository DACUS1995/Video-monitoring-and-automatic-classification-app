

class ElectronRendererSocketHandler
{
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
     * The messages come as an object so there is no need to json_decode them
     * 
     * @param {string} objDecodedMessage 
     */
    static handleIncomingMessage(objDecodedMessage)
    {
        if(objDecodedMessage.subject == "log")
        {
            console.log(objDecodedMessage.message);
        }

        if(objDecodedMessage.subject == "first-message")
        {
            console.log(objDecodedMessage.message);
        }

        if(objDecodedMessage.subject == "classification_results")
        {
            console.log(`---> Message from classifier: ${JSON.stringify(objDecodedMessage)}`);

            let elImgInstructionImage = document.getElementById("instruction-image");
            let elDivInstructionText = document.getElementById("instruction-text");

            if(objDecodedMessage.message.name == "person")
            {
                console.log("Detected a handsome man!");
                elImgInstructionImage.src = ElectronRendererSocketHandler.instructionImagePath + "left_arrow.png";
                elDivInstructionText.innerText = "Hooman!";
            }
            else
            {
                console.log("Not a handsome man");
                elImgInstructionImage.src = ElectronRendererSocketHandler.instructionImagePath + "right_arrow.png";
                elDivInstructionText.innerText = "Not Hooman!";                
            }
        }
    }

    static get instructionImagePath(){return "./static/images/"}
}

const configs = 
{
    option_1 : 
    {
        image_source: "./static/images/left_arrow.png",
        text: "Generic text for option 1"
    },
    option_2:
    {
        image_source: "./static/images/right_arrow.png",
        text: "Generic text for option 2"
    }
}

module.exports = ElectronRendererSocketHandler;