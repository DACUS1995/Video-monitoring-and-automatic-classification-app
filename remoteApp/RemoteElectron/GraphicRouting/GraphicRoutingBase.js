class GraphicRoutingBase
{
    /**
     * @param {HTMLDivElement} elDivInstructionContainer 
     */
    constructor(elDivInstructionContainer)
    {
        this._elDivInstructionContainer = elDivInstructionContainer;
    }

    /**
     * @param {Object} objClassificationResults 
     */
    updateInterface(objClassificationResults)
    {
        throw Error("Must be implemented");
    }

    setAditionalElements()
    {
        throw new Error("Must be implemented");
    }
}

module.exports = GraphicRoutingBase;
