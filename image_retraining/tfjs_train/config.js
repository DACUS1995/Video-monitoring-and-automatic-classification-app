const config = {
    classes: [
        "walking_stick",
        "wheelchair"
    ],
    image_path: "../Images",
    BATCH_SIZE: 0.1,
    EPOCHS: 40,
    DENSE_UNITS: 200
};

config.NUM_CLASSES = config.classes.length,

module.exports = config;