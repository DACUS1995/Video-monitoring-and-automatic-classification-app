import retrainTFJS from "./retrainTFJS.js";
import DatasetHandler from "./dataset_handler.js";
// import ImageLoader from "./ImageLoader.js";
import config from "./config.js";

class MainTrainer
{
    constructor()
    {
        this.objImageList = null;
    }
    
    async init()
    {
        // const trainer = new retrainTFJS();
        const objImageList = await (await fetch("http://127.0.0.1:5500/imageList.json")).json();
        this.objImageList = objImageList;

        this.imageHandler(objImageList);
    }
    
    async imageHandler(objImageList)
    {
        const elImageHandler = document.getElementById("image_holder");
        const it = this.imageIterator();

        setInterval(()=>{
            elImageHandler.src = `./Images/${it.next().value}`;
        }, 1000);
    }

    *imageIterator()
    {
        for(let strClassName in this.objImageList)
        {
            for(let strImageName of this.objImageList.walking_stick)
            {
                yield `${strClassName}/${strImageName}`;
            }
        }
    }
}


export default new MainTrainer;

