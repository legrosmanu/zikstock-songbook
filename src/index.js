const express = require('express');
const app = express();
const http = require('http');
const bodyParser = require('body-parser');
const healthCheckConfig = require('./config/health-check-config.js');

app.use(bodyParser.json()); // for parsing application/json

// API defintions
const ZikResourcesAPI = require('./api/zik-resource-api');
zikResourcesAPI = new ZikResourcesAPI(app);
zikResourcesAPI.setRoutes();

// Run the server
const server = http.createServer(app);
healthCheckConfig.createHealthCheck(server);
server.listen(process.env.PORT || 3000, () => {
    console.log('The spot4zik-core is running.');
});
