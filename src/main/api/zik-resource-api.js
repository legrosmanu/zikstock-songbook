class ZikResourceApi {

    constructor(app) {
        this.app = app;
    }

    setRoutes() {
        this.app.post('/api/zik-resources', this.postZikResource);
        this.app.get('/api/zik-resources', this.getZikResources);
        this.app.get('/api/zik-resources/:id', this.getZikResource);
        this.app.delete('/api/zik-resources/:id', this.deleteZikResource);
    }

    async postZikResource(req, res) {
        res.sendStatus(501);
    }

    async getZikResources(req, res) {
        res.sendStatus(501);
    }

    async getZikResource(req, res) {
        res.sendStatus(501);
    }
    
    async deleteZikResource(req, res) {
        res.sendStatus(501);
    }

}

module.exports = ZikResourceApi;
