var mongoose = require("mongoose");
var Schema = mongoose.Schema;


const Books = new Schema({
    name: { type: String, unique: true, required: true },
    status: { type: Boolean },
    categoryId: { type: Schema.ObjectId, ref: "Category" },
    createAt: { type: Date, default: Date.now },
    updateAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Books", Books);
