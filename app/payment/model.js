const mongoose = require("mongoose");

const paymentSchema = mongoose.Schema({
  typePayment: {
    type: String,
    require: [true, "Tipe pembayaran harus di isi!"],
  },
  status: {
    type: String,
    enum: ["Y", "N"],
    default: "Y",
  },
  banks: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Banks",
    },
  ],
});

module.exports = mongoose.model("Payments", paymentSchema);
