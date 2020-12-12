const express = require('express');
const bodyParser = require('body-parser');

const ZikResourceDao = require('./zikresource-dao');

const zikResourceRouter = express.Router();
zikResourceRouter.use(bodyParser.json());

zikResourceRouter.post('/', async (req, res, next) => {

    try {
        let zikResource = await ZikResourceDao.saveZikResource(req.body);
        res.status(201).json(zikResource);
    } catch (err) {
        next(err);
    }

});

module.exports = zikResourceRouter;
