const express = require('express');

const http = require('http');

const app = express();
const server = http.createServer(app);
server.listen(process.env.NODE_PORT || 3000);
