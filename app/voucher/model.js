const mongoose = require("mongoose");

const voucherSchema = mongoose.Schema({
  nameGame: {
    type: String,
    require: [true, "Nama game harus di isi!"],
  },
  status: {
    type: String,
    enum: ["Y", "N"],
    default: "Y",
  },
  thumbnail: {
    type: String,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Categories",
  },
  nominals: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Nominals",
    },
  ],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
  },
});

module.exports = mongoose.model("Vouchers", voucherSchema);
