"use strict"

const Webcam = require("./Webcam");
const labels = require("./imagenet_class_index.json");
// const tf = require("@tensorflow/tfjs");

class Predicter
{
    /**
	 * @param {HTMLVideoElement} webcamElement A HTMLVideoElement representing the webcam feed.
	 */
    constructor(webcamElement)
    {
        this._webcam = new Webcam(webcamElement);
        this._model = null;
        this._mobilenet = null;
        this._bStopPredicting = false;
    }

    async predict()
    {
        this._bStopPredicting = true;
        
        console.log("Loading the model.");
        await this.loadMobilenet();
        
        while(this._bStopPredicting)
        {
            console.log("Predicting..");
            const predictedClass = tf.tidy(() => {
                // Get frame from webcam
                const image = this._webcam.capture();
    
                const predictions = this._model.predict(image);

                // Print all the prediction scores
                // predictions.as1D().argMax().print();
                
                // predictions.as1D().max().print(); // Computes the maximum of elements across dimensions
                
                // console.log(predictions.as1D().argMax());
                return predictions.as1D().argMax(); // Returns the indices of the maximum values
            });
    
            const classId = (await predictedClass.data())[0];
            console.log(labels[classId]);
    
            await tf.nextFrame();
        }
    }

    // load Mobilenet mobile from CDN, for presentation use a downloaded version
    async loadMobilenet(bSaveModel = false)
    {
        this._model = await tf.loadModel(
            "https://storage.googleapis.com/tfjs-models/tfjs/mobilenet_v1_0.25_224/model.json"
        );

        if(bSaveModel)
        {
            const strModelJSON = await fetch(Predicter.mobilenetURL).then(res => res.json());
            this.constructor.saveModel(strModelJSON, "mobilenet.json");
        }
    }
    
    /**
     * Save the model to a json file for later reuse
     * 
     * @param {string} strModelJSON 
     * @param {string} strModelName
     */
    static async saveModel(strModelJSON, strModelName)
    {
        // const savePromise = await new Promise((resolve, reject) => {
        //     fs.writeFile(strModelName, strModelJSON, "utf8", resolve);
        // });

        let link = document.createElement("a");
        link.download = strModelName;
        link.href = "data:application/json;charset=utf-8," + strModelJSON;

        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        link = null;
    }

    stopPredicting()
    {
        this._bStopPredicting = true;
    }

    static get mobilenetURL() {return "https://storage.googleapis.com/tfjs-models/tfjs/mobilenet_v1_0.25_224/model.json"}
}

module.exports = Predicter;
