const express = require('express');
const app = express();
const http = require('http');
const bodyParser = require('body-parser');
const healthCheckConfig = require('./config/health-check-config.js');

app.use(bodyParser.json()); // for parsing application/json

// API defintions
const ZikResourcesAPI = require('./zik-resource/zik-resource-api');
zikResourcesAPI = new ZikResourcesAPI(app);
zikResourcesAPI.setRoutes();

// Database connection
const mongoose = require('mongoose');
const dbConfig = require('./config/database');
mongoose.connect(dbConfig.url, { useNewUrlParser: true });

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (err) {
  if (err) {
    console.log(err);
  } else {
    // Run the server
    const server = http.createServer(app);
    healthCheckConfig.createHealthCheck(server);
    server.listen(process.env.PORT || 3000, () => {
      console.log("The spot4zik-core is running. Cool... isn't it?");
    });
  }
});
