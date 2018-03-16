const spawn = require('child_process').spawn;
const path = require("path");
const fs = require("fs");


let strObjectDetectionModulePath = "./remoteVideoClassifier";
let strObjectDetectionFile = path.resolve(strObjectDetectionModulePath, "object_detection.py");
    
// Check if the model and the labels files exists
if(!fs.existsSync(strObjectDetectionFile))
{
    console.log("The model file or the label file is missing");
}

let params = `${strObjectDetectionFile}`;
let options = {
    silent: false,
    shell: true,
    stdio: ["inherit", "inherit", "inherit", "ipc"],
    cwd: path.resolve(strObjectDetectionModulePath)
};

let remoteElectronProcess = spawn(`python`, [params], options);
