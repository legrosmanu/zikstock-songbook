const http = require('http');
const app = require('./main/app');

const { MongoDbHandler } = require('./main/mongodb-handler');

const mongodbHandler = new MongoDbHandler();
mongodbHandler.connect();

const server = http.createServer(app);
server.listen(process.env.NODE_PORT || 3000);

module.exports = app;
