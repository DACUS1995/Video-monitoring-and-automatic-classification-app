const fs = require("fs-extra");
const config = require("./config");
const path = require("path");

class ImageLoader
{
    constructor()
    {

    }

    /**
     * Load an image from the built list of images
     */
    async loadImages()
    {

    }

    async gatherImagesList()
    {
        for(let strClassName of config.classes)
        {
            //Check if images folder is a directory and then get all the file names and push them in an array to use them later when loading them sequentially when training
            if(await fs.stat.isDirectory())
        }
    }
}

const config = {
    
};

module.exports = ImageLoader;