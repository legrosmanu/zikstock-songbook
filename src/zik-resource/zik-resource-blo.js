const ZikResource = require('./zik-resource');

module.exports = class ZikResourceBLO {

    async createZikResource(data) {
        // TODO : check the mandatory fields.
        let zikResource = new ZikResource(data);
        zikResource.creationDate = new Date().toISOString();
        // TODO: add the addedBy.
        let newZikResource =  await zikResource.save();
        return newZikResource.toJSON();
    }

    async getZikResource(id) {
        let zikResource = await ZikResource.findById(id);
        return zikResource;
    }

};
