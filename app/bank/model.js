const mongoose = require("mongoose");

const bankSchema = mongoose.Schema({
  nameOwner: {
    type: String,
    require: [true, "Nama pemilik harus diisi"],
  },
  nameBank: {
    type: String,
    require: [true, "Nama bank harus diisi"],
  },
  noRekening: {
    type: Number,
    require: [true, "Nomor Rekening bank harus diisi"],
  },
  
});

module.exports = mongoose.model("Banks", bankSchema);
