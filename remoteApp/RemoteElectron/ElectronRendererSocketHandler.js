

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
            // Stop the automatic rendering of default message
            clearTimeout(this.timeoutID);
            this.timeoutID = null;

            console.log(`---> Message from classifier: ${JSON.stringify(objDecodedMessage)}`);

            let elImgInstructionImage = document.getElementById("instruction-image");
            let elDivInstructionText = document.getElementById("instruction-text");

            console.log(`Detected: [${objDecodedMessage.message.name}]`);
 
            // Here you should add the detection classes and the specific settings
            if(objDecodedMessage.message.name == "person")
            {
                elImgInstructionImage.src = ElectronRendererSocketHandler.instructionImagePath + "left_arrow.png";
                elDivInstructionText.innerText = "Hooman!";
            }
            else
            {
                elImgInstructionImage.src = ElectronRendererSocketHandler.instructionImagePath + "right_arrow.png";
                elDivInstructionText.innerText = objDecodedMessage.message.name;                
            }

            this.timeoutID = setTimeout(()=>
            {
                elImgInstructionImage.src = ElectronRendererSocketHandler.instructionImagePath + "forward_arrow.png";
                elDivInstructionText.innerText = "Running on empty!"; 
            }, 
            5000);
        }
    }

    static get instructionImagePath(){ return "./static/images/" }
    static get classConfigs(){ return classPathsConfig } 

}

ElectronRendererSocketHandler.timeoutID = null;

const classPathsConfig = 
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
    },
    option_3:
    {
        image_source: "./static/images/right_arrow.png",
        text: "Generic text for option 3"
    }
}

module.exports = ElectronRendererSocketHandler;