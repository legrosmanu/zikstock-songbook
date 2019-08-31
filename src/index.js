const express = require('express');
const app = express();
const http = require('http');
const bodyParser = require('body-parser');
const healthCheckConfig = require('./health-check-config.js');

app.use(bodyParser.json()); // for parsing application/json

const server = http.createServer(app);
healthCheckConfig.createHealthCheck(server);
server.listen(process.env.PORT || 3000);

module.exports = { app, server };
