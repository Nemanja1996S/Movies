const mongoose = require("mongoose");

const listSchema = mongoose.Schema({
    naziv: { type: String, required: true },
    reziser: { type: String },
    korime: { type: String, required: true },
    status: { type: String, required: true }, //dodata,trenutno,pogledan

});

module.exports = mongoose.model("List", listSchema);