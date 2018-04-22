const GraphicRoutingBase = require("./GraphicRoutingBase");

class GraphicRouting extends GraphicRoutingBase
{

    /**
     * @param {HTMLDivElement} elDivInstructionContainer 
     */
    constructor(elDivInstructionContainer)
    {
        super(elDivInstructionContainer);
        
        this._elTextInstruction = null;
        this._elGraphicalIntruction = null;

        this._objConfigViews = null;
        this._defaultViewTimeoutID = null;
    }

    /**
     * @param {Object} objClassificationResults 
     */
    updateInterface(objClassificationResults)
    {
        if(
            this._elGraphicalIntruction == null
            || this._elTextInstruction == null
            || this._objConfigViews == null
        )
        {
            this.setAditionalElements();
        }

        // Stop the automatic rendering of default message
        if(this._defaultViewTimeoutID !== null)
        {
            clearTimeout(this._defaultViewTimeoutID);
            this._defaultViewTimeoutID = null;
        }

        // Here you should add the detection classes and the specific settings
        if(this._objConfigViews.classesNames.includes(objClassificationResults.className))
        {
            this._elTextInstruction.innerText = this._objConfigViews.classes[objClassificationResults.className].text;
            this._elGraphicalIntruction.src = this._objConfigViews.classes[objClassificationResults.className].imagePath;
        }

        this._defaultViewTimeoutID = setTimeout(() =>
        {
            // After five seconds if there are no valid classification set the default view
            this._elTextInstruction.innerText = this._objConfigViews.classes["default"].text;
            this._elGraphicalIntruction.src = this._objConfigViews.classes["default"].imagePath;
        }, 
        5000);
    }

    setAditionalElements()
    {
        this._elTextInstruction = document.getElementById("instruction-text");
        this._elGraphicalIntruction = document.getElementById("instruction-image");
        this._objConfigViews = require("./configViews.json"); //Should implement a safe json parse function
    } 
}

module.exports = GraphicRouting;