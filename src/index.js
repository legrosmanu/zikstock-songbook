const http = require('http');
const app = require('./main/app');

const server = http.createServer(app);
server.listen(process.env.NODE_PORT || 3000);

module.exports = app;
