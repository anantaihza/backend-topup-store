const Banks = require("./model");

module.exports = {
  index: async (req, res) => {
    try {
      const alertMessage = req.flash("alertMessage");
      const alertStatus = req.flash("alertStatus");

      const alert = {
        message: alertMessage,
        status: alertStatus,
      };

      const banks = await Banks.find();

      res.render("admin/bank/view_bank", {
        title: "Bank",
        banks,
        alert,
      });
    } catch (error) {
      console.log(error);
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/bank");
    }
  },

  viewCreate: async (req, res) => {
    try {
      res.render("admin/bank/create", {
        title: "Create Bank",
      });
    } catch (error) {
      console.log(error);
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/bank");
    }
  },

  actionCreate: async (req, res) => {
    try {
      const { nameOwner, nameBank, noRekening } = req.body;

      let banks = await Banks({ nameOwner, nameBank, noRekening });
      await banks.save();

      req.flash(
        "alertMessage",
        `Berhasil menambahkan nomor rekening: "${noRekening}" dari bank: "${nameBank}", milik ${nameOwner}`
      );
      req.flash("alertStatus", "success");

      res.redirect("/bank");
    } catch (error) {
      console.log(error);
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/bank");
    }
  },

  viewEdit: async (req, res) => {
    try {
      const { id } = req.params;
      const bank = await Banks.findOne({ _id: id });

      res.render("admin/bank/edit", {
        title: "Edit Bank",
        bank,
      });
    } catch (error) {
      console.log(error);
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/bank");
    }
  },

  actionEdit: async (req, res) => {
    try {
      const { id } = req.params;
      const { nameOwner, nameBank, noRekening } = req.body;

      const bank = await Banks.findOne({ _id: id });

      await Banks.findOneAndUpdate(
        {
          _id: id,
        },
        { nameOwner, nameBank, noRekening }
      );

      req.flash(
        "alertMessage",
        `Berhasil mengubah data Bank milik: "${bank.nameOwner}"`
      );
      req.flash("alertStatus", "success");

      res.redirect("/bank");
    } catch (error) {
      console.log(error);
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/bank");
    }
  },

  actionDelete: async (req, res) => {
    try {
      const { id } = req.params;

      const bank = await Banks.findOne({ _id: id });

      await Banks.findOneAndRemove({
        _id: id,
      });

      req.flash(
        "alertMessage",
        `Berhasil menghapus nomor rekening bank milik "${bank.nameOwner}"`
      );
      req.flash("alertStatus", "success");

      res.redirect("/bank");
    } catch (error) {
      console.log(error);
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/bank");
    }
  },
};
