const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Users = new Schema({
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true, select: false },
        isActive: { type: Boolean, default: true },
        createdAt: { type: Date, default: Date.now },
        updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Users', Users);