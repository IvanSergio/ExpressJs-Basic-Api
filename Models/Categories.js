var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Categories = Schema({
    name: {type: String, required:true},
    state: {type: Boolean, default: true},
    createdAt: {type: Date, default: Date.now},
    updatedAt: {type: Date, default: Date.now}
});

module.exports = mongoose.model('Categories', Categories);
