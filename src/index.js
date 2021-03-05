const http = require('http');
let app = null;
const { DbHandlerFactory } = require('./main/helpers/db-handler-factory');
const result = require('dotenv').config({path:'./dist/.env'});

if (result.error) {
    throw result.error;
}

DbHandlerFactory.build().then(() => {
    app = require('./main/app');
    const server = http.createServer(app);
    server.listen(process.env.NODE_PORT || 3000);
});

module.exports = app;
