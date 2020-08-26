const express = require('express');
const ZikResourceApi = require('./api/zik-resource-api');

class Server {

    constructor() {
        this.express = express();
        this.zikResourceRoutes = new ZikResourceApi(this.express);
        this.zikResourceRoutes.setRoutes();
    }

}

module.exports = new Server().express;
