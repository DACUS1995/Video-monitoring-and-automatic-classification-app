const tf = require("@tensorflow/tfjs");
const DatasetHandler = require("./dataset_handler");
const ImageLoader = require("./ImageLoader");
const config = require("./config");

class retrainTFJS
{
    constructor()
    {
        this._mobilenet = null;
        this._model = null;
        this._datasetHandler = DatasetHandler;
        this._imageLoader = new ImageLoader();
    }

    /**
     * Sets up and trains the classifier.
     */
    async train() 
    {
        if (this._datasetHandler.xs == null) 
        {
            throw new Error('Add some examples before training!');
        }
  
        // Creates a 2-layer fully connected model. By creating a separate model,
        // rather than adding layers to the mobilenet model, we "freeze" the weights
        // of the mobilenet model, and only train weights from the new model.
        model = tf.sequential({
            layers: [
                // Flattens the input to a vector so we can use it in a dense layer. While
                // technically a layer, this only performs a reshape (and has no training
                // parameters).
                tf.layers.flatten({inputShape: [7, 7, 256]}),

                // Layer 1
                tf.layers.dense({
                    units: retrainTFJS.DENSE_UNITS,
                    activation: 'relu',
                    kernelInitializer: 'varianceScaling',
                    useBias: true
                }),
                
                // Layer 2. The number of units of the last layer should correspond
                // to the number of classes we want to predict.
                tf.layers.dense({
                    units: NUM_CLASSES,
                    kernelInitializer: 'varianceScaling',
                    useBias: false,
                    activation: 'softmax'
                })
            ]
        });
  
        // Creates the optimizers which drives training of the model.
        const optimizer = tf.train.adam(ui.getLearningRate());
        // We use categoricalCrossentropy which is the loss function we use for
        // categorical classification which measures the error between our predicted
        // probability distribution over classes (probability that an input is of each
        // class), versus the label (100% probability in the true class)>
        model.compile({optimizer: optimizer, loss: 'categoricalCrossentropy'});
  
        // We parameterize batch size as a fraction of the entire dataset because the
        // number of examples that are collected depends on how many examples the user
        // collects. This allows us to have a flexible batch size.
        const batchSize =
            Math.floor(this._datasetHandler.xs.shape[0] * retrainTFJS.BATCH_SIZE);
        if (!(batchSize > 0)) {
          throw new Error(`Batch size is 0 or NaN. Please choose a non-zero fraction.`);
        }
  
    // Train the model! Model.fit() will shuffle xs & ys so we don't have to.
        model.fit(this._datasetHandler.xs, this._datasetHandler.ys, {
            batchSize,
            epochs: retrainTFJS.EPOCHS,
            callbacks: {
                onBatchEnd: async (batch, logs) => {
                    console.log('Loss: ' + logs.loss.toFixed(5));
                    await tf.nextFrame();
                }
            }
        });
    }

    async prepareDataset()
    {
        const intermediateModel = await this.loadMobilenet();

    }

    async loadMobilenet()
    {
        this._mobilenet = await tf.loadModel('https://storage.googleapis.com/tfjs-models/tfjs/mobilenet_v1_0.25_224/model.json');
      
        // Return a model that outputs an internal activation.
        const layer = this._mobilenet.getLayer('conv_pw_13_relu');
        return tf.model({inputs: this._mobilenet.inputs, outputs: layer.output});
    }
    static get BATCH_SIZE(){return 0.1;};
    static get NUM_CLASSES(){return config.classes.length;}
    static get EPOCHS(){return 40;};
    static get DENSE_UNITS(){return 200;};
}

module.exports = retrainTFJS;