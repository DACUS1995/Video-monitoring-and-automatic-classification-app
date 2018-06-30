const retrainTFJS = require("./retrainTFJS.js");
const tf = require("@tensorflow/tfjs");
const DatasetHandler = require("./dataset_handler");
const ImageLoader = require("./ImageLoader");
const config = require("./config");

async function execute()
{
    
}

execute()
    .then(()=>{
        console.log("::Starting..");
})
    .catch((err)=>{
        console.log(err);
    })