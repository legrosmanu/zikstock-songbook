const express = require('express');
const ZikResourceRoutes = require('./api/zik-resource-routes');

class Server {

    constructor() {
        this.express = express();
        this.zikResourceRoutes = new ZikResourceRoutes(this.express);
        this.zikResourceRoutes.setRoutes();
    }

}

module.exports = new Server().express;
