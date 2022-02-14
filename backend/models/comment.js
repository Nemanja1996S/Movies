const mongoose = require("mongoose");

const commentSchema = mongoose.Schema({
    naziv: { type: String, required: true },
    reziser: { type: String },
    korime: { type: String, required: true },
    ocena: { type: Number, required: true },
    tekst: { type: String},
});

module.exports = mongoose.model("Comment", commentSchema);