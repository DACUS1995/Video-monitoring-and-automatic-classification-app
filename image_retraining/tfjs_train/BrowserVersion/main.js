import retrainTFJS from "./retrainTFJS.js";
import DatasetHandler from "./dataset_handler.js";
import Webcam from "./Webcam.js";
// import ImageLoader from "./ImageLoader.js";
import config from "./config.js";
import Classifier from "./TFjsClassifier.js";

class MainTrainer
{
    constructor()
    {
        this.objImageList = null;
        this.webcam = null;
        this.dataset = DatasetHandler;
        this.mobilenet = null;
        this.objImages = {};
    }
    
    async init()
    {
        const trainer = new retrainTFJS();
        const objImageList = await (await fetch("http://127.0.0.1:5500/imageList.json")).json();
        this.objImageList = objImageList;

        console.log("::Gathering data");
        await this.imageHandler(objImageList);
        // console.log("::Training new model");
        const localTrainedModel = trainer.train();
        // document.getElementById("image_container").innerHTML = "";
        console.log("::Training Finished");

        let elVideo = document.getElementById('remoteVideo');

        navigator.mediaDevices.getUserMedia({audio: false, video: true /*video: objVideoConstraints*/}) 
		.then(function (localStream) {
			elVideo.src = window.URL.createObjectURL(localStream);
            console.log(`Video Url: ${elVideo.src}`);
            
            const classifier = new Classifier(elVideo, localTrainedModel);
            classifier.runClassifier();
		})
		.catch(function (err) {
			console.log('The following error occurred: ' + err.name)
		})
    }
    
    async imageHandler(objImageList)
    {
        let elImageHandler = document.getElementById("image_holder");
        let elDivImageContainer = document.getElementById("image_container");
        // const it = this.imageIterator();

        this.webcam = new Webcam(elImageHandler);
        const model = await this.loadMobilenet();

        for(let strClassName in this.objImageList)
        {
            this.objImages[strClassName] = [];

            for(let strImageName of this.objImageList[strClassName])
            {
                let elImage = document.createElement("img");
                elImage.src = `./Images/${strClassName}/${strImageName}`;
                elImage.width = 224;
                elImage.height = 224;

                // elImage.class = strImageName;
                elDivImageContainer.appendChild(elImage);

                this.objImages[strClassName].push(elImage);
            }
        }

        for(let strClass in this.objImages)
        {
            for(let elImage of this.objImages[strClass])
            {
                console.log(elImage);
                // let image = elImage;
                // let canvas = document.createElement("canvas");
                // let context = canvas.getContext("2d");
                // canvas.width = image.width;
                // canvas.height = image.height;

                // context.drawImage(image, 0, 0);
                // let dataImage = context.getImageData(0, 0, image.width, image.height);
                // tf.fromPixels(dataImage).print();
                // console.log(dataImage);
                
                let img = this.webcam.capture(elImage);
                this.dataset.addExample(model.predict(img), this.getLabelIndexFromName(strClass));
                throw new Error();

                // throw new Error();
            }
        }


        // for(let strClassName in this.objImageList)
        // {
        //     for(let strImageName of this.objImageList[strClassName])
        //     {
        //         await this.loadImage(elImageHandler, `./Images/${strClassName}/${strImageName}`);
        //         // elImageHandler.src = `./Images/${strClassName}/${strImageName}`; 
        //         // elImageHandler = document.getElementById("image_holder");
        //         // console.log(elImageHandler);
        //         // const it = this.imageIterator();
        
        //         // this.webcam = new Webcam(elImageHandler);
                
        //         let img = this.webcam.capture();
        //         img.print();
        //         this.dataset.addExample(model.predict(img), this.getLabelIndexFromName(strClassName));

        //         let elImage = document.getElementsByClassName("strImageName")[this.getLabelIndexFromName(strClassName)];
        //         this.webcam = new Webcam(elImage);
        //     }
        // }

        // setInterval(()=>{
        //     elImageHandler.src = `./Images/${it.next().value}`;
        // }, 1000);
    }
  

    loadImage(elImage, strImageSrc)
    {

        console.log(strImageSrc);
        return new Promise((resolve, reject)=>{
            elImage.src = strImageSrc;
            elImage.addEventListener("load", resolve);
            // elImage.onload(resolve);
        });
    }

    async loadMobilenet()
    {
        this.mobilenet = await tf.loadModel('https://storage.googleapis.com/tfjs-models/tfjs/mobilenet_v1_0.25_224/model.json');
      
        // Return a model that outputs an internal activation.
        const layer = this.mobilenet.getLayer('conv_pw_13_relu');
        return tf.model({inputs: this.mobilenet.inputs, outputs: layer.output});
    }

    getLabelIndexFromName(strLabel)
    {
        const objLabels = {
            "walking_stick": 0,
            "wheelchair": 1
        };

        return objLabels[strLabel];
    }


    *imageIterator(strClassName)
    {
        for(let strImageName of this.objImageList[strClassName])
        {
            yield `${strClassName}/${strImageName}`;
        }
    }

    /**
     * @param {number} nInterval 
     */
    interval(nInterval)
    {
        return new Promise((resolve, reject) => {
            setInterval(resolve, nInterval);
        });
    }
}


export default new MainTrainer;

