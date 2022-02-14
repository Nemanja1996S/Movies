const mongoose = require("mongoose");

const bookSchema = mongoose.Schema({
    slikaPutanja: { type: String, required: true },
    naziv: { type: String, required: true },
    reziser: { type: String }, //mozda treba required
    datum: { type: Date, required: true },
    zanrovi: [{ type: String }], //max 3 zanra
    opis: { type: String, required: true },
    prosek: { type: Number, required: true },
    zahtev: { type: Boolean, required: true },
    odobren: { type: Boolean, required: true }

});

module.exports = mongoose.model("Movie", bookSchema);