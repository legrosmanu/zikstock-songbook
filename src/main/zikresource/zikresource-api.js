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

zikResourceRouter.get('/:id', async (req, res, next) => {

    try {
        let zikResource = await ZikResourceDao.retrieveZikResourceById(req.param.id);
        if (zikResource != null) {
            res.status(200).json(zikResource);
        } else {
            res.sendStatus(404);
        }
    } catch (err) {
        next(err);
    }

});

zikResourceRouter.delete('/:id', async (req, res, next) => {

    try {
        let zikResource = await ZikResourceDao.retrieveZikResourceById(req.param.id);
        if (zikResource != null) {
            await ZikResourceDao.deleteZikResource(zikResource);
        }
        res.sendStatus(204);
    } catch (err) {
        next(err);
    }

});

zikResourceRouter.put('/:id', async (req, res, next) => {

    try {
        let zikResource = await ZikResourceDao.updateZikResource(req.param.id, req.body);
        if (zikResource != null) {
            res.status(200).json(zikResource);
        } else {
            res.sendStatus(404);
        }
    } catch (err) {
        next(err);
    }

});

module.exports = zikResourceRouter;
