const express = require('express');

const zikResourceRouter = require('./zikresource/zikresource-api');

const app = express();

app.use('/api/zikresources', zikResourceRouter);

module.exports = app;
