const Payments = require("./model");
const Banks = require("../bank/model");

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
      const banks = await Banks.find();

      res.render("admin/payment/create", {
        title: "Create Payment",
        banks,
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

  viewEdit: async (req, res) => {
    try {
      const { id } = req.params;
      const payment = await Payments.findOne({ _id: id });
      const banks = await Banks.find();

      res.render("admin/payment/edit", {
        title: "Edit Payment",
        banks,
        payment,
      });
    } catch (error) {
      console.log(error);
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/payment");
    }
  },

  actionEdit: async (req, res) => {
    try {
      const { id } = req.params;
      const { typePayment, banks } = req.body;

      const payment = await Payments.findOne({ _id: id });

      await Payments.findOneAndUpdate(
        {
          _id: id,
        },
        { typePayment, banks }
      );

      req.flash(
        "alertMessage",
        `Berhasil mengubah data nominal: 
        ("${payment.typePayment}" menjadi "${typePayment}")`
      );
      req.flash("alertStatus", "success");

      res.redirect("/payment");
    } catch (error) {
      console.log(error);
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/payment");
    }
  },

  actionDelete: async (req, res) => {
    try {
      const { id } = req.params;

      const payment = await Payments.findOne({ _id: id });

      await Payments.findOneAndRemove({
        _id: id,
      });

      req.flash(
        "alertMessage",
        `Berhasil menghapus Nominal "${payment.typePayment}"`
      );
      req.flash("alertStatus", "success");

      res.redirect("/payment");
    } catch (error) {
      console.log(error);
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/payment");
    }
  },
};
