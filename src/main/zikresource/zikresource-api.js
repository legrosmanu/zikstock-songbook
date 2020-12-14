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

zikResourceRouter.get('/', async (req, res, next) => {

    try {
        let zikResources = await ZikResourceDao.retrieveZikResources();
        if (zikResources != null) {
            res.status(200).json(zikResources);
        } else {
            res.sendStatus(200).json([]);
        }
    } catch (err) {
        next(err);
    }

});

zikResourceRouter.get('/:id', async (req, res, next) => {

    try {
        let zikResource = await ZikResourceDao.retrieveZikResourceById(req.params.id);
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
        let zikResource = await ZikResourceDao.updateZikResource(req.params.id, req.body);
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
