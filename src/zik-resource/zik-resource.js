var mongoose = require('mongoose');

let labelSchema = new mongoose.Schema({
    label: String,
    value: String
});

let ZikResourceModel = new mongoose.Schema({
    url: String,
    artist: String,
    title: String,
    tags: [labelSchema],
    creationDate: Date,
    addedBy: String
}, {
    toJSON: {
        transform: function (doc, ret) {
            delete ret.__v;
        }
    }
});

module.exports = mongoose.model('ZikResource', ZikResourceModel);
