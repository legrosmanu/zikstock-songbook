module.exports = class ZikResourcesAPI {
    
    constructor(app) {
        this.app = app;
    }

    setRoutes() {
        this.app.post("/zik-resources", this.createZikResource);
    }

    async createZikResource() {
        // TODO
    }

};
