const ZikResource = require('./zikresource');
const ZikStockError = require('./zikstock-error');

// Save the zikResource in the database, with the constrains defined in the Mongoose Schema
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

let deleteZikResource = async (zikResource) => {
    await ZikResource.deleteOne({ _id: zikResource._id });
};

let retrieveZikResourceById = async (id) => {
    return await ZikResource.findById(id);
};

// TODO: retrieve the ZikResources of a user will be done after the basic auth implementation

let updateZikResource = async (id, data) => {
    return await ZikResource.findOneAndUpdate({_id: id}, data, { new: true });
};

module.exports.saveZikResource = saveZikResource;
module.exports.deleteZikResource = deleteZikResource;
module.exports.retrieveZikResourceById = retrieveZikResourceById;
module.exports.updateZikResource = updateZikResource;
