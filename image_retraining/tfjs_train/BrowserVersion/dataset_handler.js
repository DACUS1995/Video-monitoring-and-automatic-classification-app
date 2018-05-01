// import tf  from "../../node_modules/@tensorflow/tfjs.js";
import config from "./config.js"

class dataset_handler
{
    constructor(numClases)
    {
        this._numClasses = numClases;
        this._xs = null;
        this._ys = null;
    }
    
    /**
     * @param {*} example 
     * @param {*} label 
     */
    addExample(example, label)
    {
        // One-hot encoding of the label
        const y = tf.tidy(() => {
            tf.tensor1d([label]),
            this._numClasses
        });

        if (this._xs == null) 
        {
            this._xs = tf.keep(example);
            this._ys = tf.keep(y);
        }
        else 
        {
            const oldX = this._xs;
            this._xs = tf.keep(oldX.concat(example, 0));
        
            const oldY = this._ys;
            this._ys = tf.keep(oldY.concat(y, 0));
        
            oldX.dispose();
            oldY.dispose();
            y.dispose();
        }
    }

    get xs()
    {
        return this._xs;
    }

    get ys()
    {
        return this._ys;s
    }
}

export default new dataset_handler(config.NUM_CLASSES);