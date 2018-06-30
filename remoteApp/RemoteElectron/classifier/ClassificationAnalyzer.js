const { ipcRenderer } = require("electron");

class ClassificationAnalyzer
{
    constructor()
    {
        this._lastClassificationResult = null;
        this._nIntervalID = null;
    }

    analyze({className: strClassName})
    {
        if(this._nIntervalID == null)
        {
            this.startInfoSender();
        }

        if(typeof strClassName === "string")
        {
            this.sendInfoToMain(strClassName);
        }
    }
    
    /**
     * @param {string} strClassName 
     */
    sendInfoToMain(strClassName)
    {
        if(Object.keys(ClassificationAnalyzer.classes).includes(strClassName))
        {
            this._lastClassificationResult = strClassName;
        }
    }

    startInfoSender()
    {
        this._nIntervalID = setInterval(() => 
        {
            if(
                this._lastClassificationResult === ClassificationAnalyzer.wheelchair
                || this._lastClassificationResult === ClassificationAnalyzer.walking_stick
            )
            {
                ipcRenderer.send("message", ClassificationAnalyzer.makeMessage(
                        "className", 
                        this._lastClassificationResult
                    )
                );
                this._lastClassificationResult = this.constructor.default;
            }
        }, 
        2000);
    }

    /**
     * Create an object ready to be sent via IPC
     * 
     * @param {string} strSubject 
     * @param {string} strMessage 
     */
    static makeMessage(strSubject, strMessage)
    {
        return JSON.stringify(
            {
                subject: strSubject,
                message: strMessage
            }
        );
    }

    static get default(){return "default";}
    static get wheelchair(){return "tricycle";}
    static get walking_stick(){return "walking_stick";}

    static get classes()
    {
        return {
            default: "default",
            tricycle: "wheelchair",
            walking_stick: "walking_stick"
        }
    }
}

module.exports = ClassificationAnalyzer;