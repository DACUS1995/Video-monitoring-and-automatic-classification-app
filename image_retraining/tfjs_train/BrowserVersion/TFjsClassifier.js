"use strict"

import Webcam from "./Webcam.js";
// const tf = require("@tensorflow/tfjs");

class TFjsClassifier
{
    /**
	 * @param {HTMLVideoElement} webcamElement A HTMLVideoElement representing the webcam feed.
     * @param {GraphicRouting} objGraphicRouter Handles the UI changes based on the classification results
	 */
    constructor(webcamElement, model)
    {
        this._webcam = new Webcam(webcamElement);
        this._webcamElement = webcamElement;

        this._model = model;
        this._mobilenet = null;
        this._bStopClassifing = false;
    }

    async runClassifier()
    {
        this._bStopClassifing = true;
        
        console.log("Loading the model.");
        // await this.loadMobilenet();
        
        console.log("Classifing..");
        while(this._bStopClassifing)
        {
            const predictedClass = tf.tidy(() => {
                // Get frame from webcam
                const image = this._webcam.capture(this._webcamElement);
    
                const predictions = this._model.predict(image); //predict is tensorflowjs method atached to the model object

                // Print all the prediction scores
                // predictions.as1D().argMax().print();
                
                // predictions.as1D().max().print(); // Computes the maximum of elements across dimensions
                
                // console.log(predictions.as1D().argMax());
                return predictions.as1D().argMax(); // Returns the indices of the maximum values
            });
    
            console.log(await predictedClass);
            // const nClassId = (await predictedClass.data())[0];
            // const strClassName = arrLabels[nClassId][1];
            // console.log(strClassName);

            this._objGraphicRouter.updateInterface(strClassName);
            await tf.nextFrame();
        }
    }

    // load Mobilenet mobile from CDN, for presentation use a downloaded version
    async loadMobilenet({bSaveModel = false, bUseExistingModel = false, strPathURI = null} = {})    
    {
        if(!bUseExistingModel)
        {
            this._model = await tf.loadModel(
                "https://storage.googleapis.com/tfjs-models/tfjs/mobilenet_v1_0.25_224/model.json"
            );
        }
        else
        {
            const strModelURI = strPathURI || "./mobilenet.json";
            this._model = require(strModelURI);
        }

        if(bSaveModel)
        {
            const strModelJSON = await fetch(this.constructor.mobilenetURL).then(res => res.json());
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
        this._bStopClassifing = true;
    }

    static get mobilenetURL() {return "https://storage.googleapis.com/tfjs-models/tfjs/mobilenet_v1_0.25_224/model.json"}
}

export default TFjsClassifier;
