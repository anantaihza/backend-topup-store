const Payments = require("./model");
const Banks = require("../bank/model")

module.exports = {
  index: async (req, res) => {
    try {
      const alertMessage = req.flash("alertMessage");
      const alertStatus = req.flash("alertStatus");

      const alert = {
        message: alertMessage,
        status: alertStatus,
      };

      const payments = await Payments.find().populate("banks");

      res.render("admin/payment/view_payment", {
        title: "Pembayaran",
        payments,
        alert,
      });
    } catch (error) {
      console.log(error);
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/payment");
    }
  },

  viewCreate: async (req, res) => {
    try {

      const banks = await Banks.find()

      res.render("admin/payment/create", {
        title: "Create Payment",
        banks
      });
    } catch (error) {
      console.log(error);
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/payment");
    }
  },

  actionCreate: async (req, res) => {
    try {
      const { typePayment, banks } = req.body;

      let payment = await Payments({ typePayment, banks });
      await payment.save();

      req.flash("alertMessage", `Berhasil tambah pembayaran "${typePayment}"`);
      req.flash("alertStatus", "success");

      res.redirect("/payment");
    } catch (error) {
      console.log(error);
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/payment");
    }
  },

//   viewEdit: async (req, res) => {
//     try {
//       const { id } = req.params;
//       const nominal = await Nominal.findOne({ _id: id });

//       res.render("admin/nominal/edit", {
//         title: "Edit Nominal",
//         nominal,
//       });
//     } catch (error) {
//       console.log(error);
//       req.flash("alertMessage", `${error.message}`);
//       req.flash("alertStatus", "danger");
//       res.redirect("/nominal");
//     }
//   },

//   actionEdit: async (req, res) => {
//     try {
//       const { id } = req.params;
//       const { coinName, coinQuantity, price } = req.body;

//       const nominal = await Nominal.findOne({ _id: id });

//       await Nominal.findOneAndUpdate(
//         {
//           _id: id,
//         },
//         { coinName, coinQuantity, price }
//       );

//       req.flash(
//         "alertMessage",
//         `Berhasil mengubah data nominal: 
//         ("${nominal.coinName}" menjadi "${coinName}"), 
//         ("${nominal.coinQuantity}" menjadi "${coinQuantity}"), 
//         ("${nominal.price}" menjadi "${price}")`
//       );
//       req.flash("alertStatus", "success");

//       res.redirect("/nominal");
//     } catch (error) {
//       console.log(error);
//       req.flash("alertMessage", `${error.message}`);
//       req.flash("alertStatus", "danger");
//       res.redirect("/nominal");
//     }
//   },

//   actionDelete: async (req, res) => {
//     try {
//       const { id } = req.params;

//       const nominal = await Nominal.findOne({ _id: id });

//       await Nominal.findOneAndRemove({
//         _id: id,
//       });

//       req.flash(
//         "alertMessage",
//         `Berhasil menghapus Nominal "${nominal.coinName}"`
//       );
//       req.flash("alertStatus", "success");

//       res.redirect("/nominal");
//     } catch (error) {
//       console.log(error);
//       req.flash("alertMessage", `${error.message}`);
//       req.flash("alertStatus", "danger");
//       res.redirect("/nominal");
//     }
//   },
};
