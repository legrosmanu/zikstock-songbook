const ZikResource = require('../dto/zik-resource');
const ZikStockError = require('../../helpers/zik-stock-error');

let saveZikResource = async (data) => {

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

// Return true if the zikResource has been deleted, else it'll return false
let deleteZikResource = async (zikResource) => {
    const result = await ZikResource.deleteOne({_id: zikResource._id});
    return (result.deletedCount === 1);
};

module.exports.saveZikResource = saveZikResource;
module.exports.deleteZikResource = deleteZikResource;
