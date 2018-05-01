import retrainTFJS from "./retrainTFJS.js";
import DatasetHandler from "./dataset_handler.js";
// import ImageLoader from "./ImageLoader.js";
import config from "./config.js";

async function init()
{
    // const trainer = new retrainTFJS();
    //TODO move the index.html in the parent folder so that we can request some files from node_modules/or use the cdn
    console.log(await (await fetch("http://127.0.0.1:5500/imageList.json")).json());
}

export default init;

