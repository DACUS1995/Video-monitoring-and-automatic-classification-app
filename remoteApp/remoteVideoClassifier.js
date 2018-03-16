const spawn = require('child_process').spawn;
const path = require("path");
const fs = require("fs");

class remoteVideoClassifier
{
    constructor()
    {
        this._remoteElectronProcess = null;
    }

    /**
     * @returns {obj} remoteElectronProcess
     */
    spawnClassificationProcess()
    {
        let strObjectDetectionModulePath = "./remoteVideoClassifier";
        let strObjectDetectionFile = path.resolve(strObjectDetectionModulePath, "object_detection.py");

        // Check if the model and the labels files exists
        if(!fs.existsSync(strObjectDetectionFile))
        {
            console.log("The python script cannot be found");
        }

		let params = `${strObjectDetectionFile}`;
		let options = {
			silent: false,
			shell: true,
            stdio: ["inherit", "inherit", "inherit", "ipc"],
            cwd: path.resolve(strObjectDetectionModulePath)
        };
        
        let remoteElectronProcess = spawn(`python`, [params], options);
        this._remoteElectronProcess = remoteElectronProcess;

        return remoteElectronProcess;
    }

    get remoteElectronProcess()
    {
        return this._remoteElectronProcess;
    }
}

module.exports = remoteVideoClassifier;