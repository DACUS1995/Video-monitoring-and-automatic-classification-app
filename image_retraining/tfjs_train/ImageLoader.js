const fs = require("fs-extra");
const config = require("./config");
const path = require("path");

class ImageLoader
{
    constructor()
    {
        this._objAvailableImages = {};
    }

    /**
     * Load an image from the built list of images
     */
    async loadImages()
    {
        if(!Object.keys(this._objAvailableImages).length)
        {
            await this._gatherImagesList();
        }

        await fs.writeFile("imageList.json", JSON.stringify(this._objAvailableImages));
    }

    async _gatherImagesList()
    {
        const strImagesPath = path.join(__dirname, config.image_path);
        
        if((await fs.stat(strImagesPath)).isDirectory())
        {
            for(let strClassName of config.classes)
            {
                //Check if images folder is a directory and then get all the file names and push them in an array to use them later when loading them sequentially when training
                this._objAvailableImages[strClassName] = [];
                const strClassFilePath = path.join(strImagesPath, strClassName);

                if((await fs.stat(strClassFilePath)).isDirectory())
                {
                    const arrFileNames = await fs.readdir(strClassFilePath);

                    for(let strImageName of arrFileNames)
                    {
                        if((await fs.stat(path.join(strClassFilePath, strImageName))).isFile())
                        {
                            // console.log(path.join(strClassFilePath, strImageName));
                            this._objAvailableImages[strClassName].push(path.join(strImageName));
                        }
                        else
                        {
                            console.log(`${strImageName} is not a correct image name.`);
                        }

                    }
                }
                else
                {
                    console.log(`${strClassFilePath} is not a correct path.`);
                }
            }
        }
        else
        {
            console.log(`Image directory: ${strImagesPath} is not correct.`);
        }

        return this._objAvailableImages;
    }
}

(new ImageLoader()).loadImages()
    .then(() => {
        console.log("Something");
    })
    .catch((e) => {
        console.log(e.stack);
    });

// module.exports = ImageLoader;