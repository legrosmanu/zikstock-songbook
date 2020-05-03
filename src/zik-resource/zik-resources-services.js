
const ZikResourceBLO = require('./zik-resource-blo');
const HttpError = require('../config/http-error');
const mongoose = require('mongoose');

module.exports = class ZikResourceServices {
    
    constructor() {
        this.blo = new ZikResourceBLO();
    }

    async createZikResource(request, response) {
        try {
            let zikResource = await this.blo.createZikResource(request.body);
            response.status(201).send(zikResource);
        } catch (error) {
            console.log(error);
            let errorToSend = new HttpError(error);
            response.status(errorToSend.httpCode).send(errorToSend);
        }
    }

    async getZikResource(request, response) {
        try {
            let id = request.params.id;
            if (mongoose.Types.ObjectId.isValid(id)) {
                let zikResource = await this.blo.getZikResource(id);
                if (zikResource !== null) {
                    response.status(200).send(zikResource);
                } else {
                    response.sendStatus(404);
                }
            } else {
                let error = new Error();
                error.code = "400-1";
                error.httpCode = 400;
                error.message = "The id is not an ObjectId";
                error.info = "TODO";
                let errorToSend = new HttpError(error);
                response.status(errorToSend.httpCode).send(errorToSend);
            }
        } catch (error) {
            console.log(error);
            let errorToSend = new HttpError(error);
            response.status(errorToSend.httpCode).send(errorToSend);
        }
    }

}