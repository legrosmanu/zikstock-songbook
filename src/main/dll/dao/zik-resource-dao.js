const ZikResource = require('../dto/zik-resource');
const ZikStockError = require('../../helpers/zik-stock-error');

let createZikResource = async (data) => {

    try {
        let zikResource = new ZikResource(data);
        let savedZikResource = await zikResource.save();
        return savedZikResource;
    } catch (err) {
        if (err.name === "ValidationError") {
            throw new ZikStockError("400-1");
        } else {
            throw err;
        }
    }

};

module.exports.createZikResource = createZikResource;
