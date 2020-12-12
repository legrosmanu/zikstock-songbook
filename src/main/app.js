const express = require('express');
const mongoose = require('mongoose');

const connect = mongoose.connect('mongodb://localhost:27017/zikstock'); // TODO : change to use env var
connect.then(() => {
    console.log("Connected to MongoDB");
}, (err) => { console.log(err); });

const zikResourceRouter = require('./zikresource/zikresource-api');

const app = express();

app.use('/api/zikresources', zikResourceRouter);

module.exports = app;
