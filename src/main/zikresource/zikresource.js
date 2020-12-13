const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let tagSchema = new Schema({
    label: String,
    value: String
});

let ZikResourceSchema = new Schema({
    url: {
        type: String,
        required: true
    },
    title: {
        type: String,
        index: true,
        required: true
    },
    type: String,
    artist: String,
    tags: {
        type : [tagSchema],
        validate: (tags) => { return tags.length <= 10; }
    },
    addedBy: {
        type: String,
        index: true
    }
}, {
    timestamps: true
});

let ZikResource = mongoose.model('ZikResource', ZikResourceSchema);

module.exports = ZikResource;
