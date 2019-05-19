const mongoose = require('mongoose');
let Schema = mongoose.Schema;

let newSchema = new Schema({
    url: { type: String },
    title: { type: String, index: true },
    time: { type: String },
    text: { type: String },
    index: { type: Array, default: [], index: true }
});

module.exports.newModel = mongoose.model('new', newSchema);