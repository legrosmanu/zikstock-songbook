const HttpError = require('./http-error');
const ZikResourceServices = require('./zik-resources-services');

module.exports = class ZikResourcesAPI {

    constructor(app) {
        this.app = app;
        this.zikResourceServices = new ZikResourceServices();
    }

    setRoutes() {
        this.app.post("/zik-resources", (req, res) => {
            this.zikResourceServices.createZikResource(req, res);
        });
    } 
    
};
