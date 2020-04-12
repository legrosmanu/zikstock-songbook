
const ZikResourceBLO = require('../business-logic/zik-resource-blo');

module.exports = class ZikResourceServices {
    
    constructor() {
        this.blo = new ZikResourceBLO();
    }

    async createZikResource(request, response) {
        try {
            // TODO : create the User and the ZikResources objects, and replace request.body by these objects 
            let zikResource = this.blo.createZikResource(request.body);
            response.status(201).send(zikResource);
        } catch (error) {
            console.log(error);
            let errorToSend = new HttpError(error);
            response.status(errorToSend.httpCode).send(errorToSend);
        }
    }

}