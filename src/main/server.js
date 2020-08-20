const express = require('express');
const app = express();
const port = 3000;

const ZikResourceRoutes = require('./api/zik-resource-routes');
const zikResourcesRoutes = new ZikResourceRoutes(app);

module.exports = app;
