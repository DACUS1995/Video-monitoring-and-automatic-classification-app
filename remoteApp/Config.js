module.export = 
class Config
{
    constructor(){};

    static get wrtcOptions(){
        return {
            headless: false // Headless state only works for linux distros
        }
    }
}