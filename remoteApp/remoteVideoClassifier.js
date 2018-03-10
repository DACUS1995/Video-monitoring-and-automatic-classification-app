const spawn = require('child_process').spawn;

class remoteVideoClassifier
{
    constructor(){}

    /**
     * @returns {obj} remoteElectronProcess
     */
    spawnClassificationProcess()
    {
		// let params = `.\\RemoteElectron\\`;
		// let options = { 
		// 	silent: false,
		// 	shell: true,
		// 	stdio: ['inherit', 'inherit', 'inherit']
        // };
        
        // let remoteElectronProcess = spawn(`electron`, [params], options);
        // return remoteElectronProcess;
    }
}

module.exports = remoteVideoClassifier;