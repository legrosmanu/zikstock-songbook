const express = require('express');
const app = express();
const http = require('http');
const bodyParser = require('body-parser');

const { createTerminus } = require('@godaddy/terminus');

async function onHealthCheck() {
    // Nothing for now
}

const terminusOptions = {
    healthChecks: { '/health-check': onHealthCheck }
};

app.use(bodyParser.json()); // for parsing application/json

const server = http.createServer(app);
createTerminus(server, terminusOptions); // for the health checks
server.listen(process.env.PORT || 3000);

module.exports = { app, server };
