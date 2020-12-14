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
    let zikResource = await ZikResource.findById(id);
    return zikResource;
};

// TODO: retrieve the ZikResources of a user will be done after the basic auth implementation
// For now, we accept to retrieve all the resources without limit.
let retrieveZikResources = async () => {
    let zikResources = await ZikResource.find({});
    return zikResources;
};

let updateZikResource = async (id, data) => {
    return await ZikResource.findOneAndUpdate({_id: id}, data, { new: true });
};

module.exports.saveZikResource = saveZikResource;
module.exports.deleteZikResource = deleteZikResource;
module.exports.retrieveZikResourceById = retrieveZikResourceById;
module.exports.retrieveZikResources = retrieveZikResources;
module.exports.updateZikResource = updateZikResource;
