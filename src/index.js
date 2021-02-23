const http = require('http');
let app = null;
const { DbHandlerFactory } = require('./main/helpers/db-handler-factory');

DbHandlerFactory.build().then(() => {
    app = require('./main/app');
    const server = http.createServer(app);
    server.listen(process.env.NODE_PORT || 3000);
});

module.exports = app;
