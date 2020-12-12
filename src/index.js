const http = require('http');
const app = require('./main/app');
const mongoose = require('mongoose');

const connect = mongoose.connect('mongodb://localhost:27017/zikstock'); // TODO : change to use env var
connect.then(() => {
    console.log("Connected to MongoDB");
}, (err) => { console.log(err); });

const server = http.createServer(app);
server.listen(process.env.NODE_PORT || 3000);

module.exports = app;
