const Vouchers = require("./model");
const Category = require("../category/model");
const Nominal = require("../nominal/model");
const path = require("path");
const fs = require("fs");
const config = require("../../config");

module.exports = {
  index: async (req, res) => {
    try {
      const alertMessage = req.flash("alertMessage");
      const alertStatus = req.flash("alertStatus");

      const alert = {
        message: alertMessage,
        status: alertStatus,
      };

      const voucher = await Vouchers.find()
        .populate("category")
        .populate("nominals");

      res.render("admin/voucher/view_voucher", {
        title: "Voucher",
        voucher,
        alert,
      });
    } catch (error) {
      console.log(error);
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/voucher");
    }
  },

  viewCreate: async (req, res) => {
    try {
      const category = await Category.find();
      const nominal = await Nominal.find();

      res.render("admin/voucher/create", {
        title: "Create Voucher",
        category,
        nominal,
      });
    } catch (error) {
      console.log(error);
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/voucher");
    }
  },

  actionCreate: async (req, res) => {
    try {
      const { nameGame, category, nominals } = req.body;

      if (req.file) {
        let tmp_path = req.file.path;
        let originalExt =
          req.file.originalname.split(".")[
            req.file.originalname.split(".").length - 1
          ];
        let filename = req.file.filename + "." + originalExt;
        let target_path = path.resolve(
          config.rootPath,
          `public/uploads/${filename}`
        );

        const src = fs.createReadStream(tmp_path);
        const dest = fs.createWriteStream(target_path);

        src.pipe(dest);
        src.on("end", async () => {
          try {
            const voucher = new Vouchers({
              nameGame,
              category,
              nominals,
              thumbnail: filename,
            });

            await voucher.save();

            req.flash("alertMessage", `Berhasil tambah voucher "${nameGame}"`);
            req.flash("alertStatus", "success");

            res.redirect("/voucher");
          } catch (error) {
            console.log(error);
            req.flash("alertMessage", `${error.message}`);
            req.flash("alertStatus", "danger");
            res.redirect("/voucher");
          }
        });
      } else {
        const voucher = new Vouchers({
          nameGame,
          category,
          nominals,
        });

        await voucher.save();

        req.flash("alertMessage", `Berhasil tambah voucher "${nameGame}"`);
        req.flash("alertStatus", "success");

        res.redirect("/voucher");
      }
    } catch (error) {
      console.log(error);
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/voucher");
    }
  },

  viewEdit: async (req, res) => {
    try {
      const { id } = req.params;
      const voucher = await Vouchers.findOne({ _id: id })
        .populate("category")
        .populate("nominals");
      const category = await Category.find();
      const nominal = await Nominal.find();
      console.log(voucher);

      res.render("admin/voucher/edit", {
        title: "Edit Voucher",
        voucher,
        category,
        nominal,
      });
    } catch (error) {
      console.log(error);
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/voucher");
    }
  },

  actionEdit: async (req, res) => {
    try {
      const { id } = req.params;
      const { nameGame, category, nominals } = req.body;
      const voucher = await Vouchers.findOne({ _id: id });

      if (req.file) {
        let tmp_path = req.file.path;
        let originalExt =
          req.file.originalname.split(".")[
            req.file.originalname.split(".").length - 1
          ];
        let filename = req.file.filename + "." + originalExt;
        let target_path = path.resolve(
          config.rootPath,
          `public/uploads/${filename}`
        );

        const src = fs.createReadStream(tmp_path);
        const dest = fs.createWriteStream(target_path);

        src.pipe(dest);
        src.on("end", async () => {
          try {
            // const voucher = await Vouchers.findOne({ _id: id });

            let currentImage = `${config.rootPath}/public/uploads/${voucher.thumbnail}`;
            if (fs.existsSync(currentImage)) {
              fs.unlinkSync(currentImage);
            }

            await Vouchers.findOneAndUpdate(
              { _id: id },
              {
                nameGame,
                category,
                nominals,
                thumbnail: filename,
              }
            );

            req.flash(
              "alertMessage",
              `Berhasil mengubah Voucher ("${voucher.nameGame}" menjadi "${nameGame}")`
            );
            req.flash("alertStatus", "success");
            res.redirect("/voucher");
          } catch (error) {
            console.log(error);
            req.flash("alertMessage", `${error.message}`);
            req.flash("alertStatus", "danger");
            res.redirect("/voucher");
          }
        });
      } else {
        await Vouchers.findOneAndUpdate(
          { _id: id },
          {
            nameGame,
            category,
            nominals,
          }
        );

        req.flash(
          "alertMessage",
          `Berhasil mengubah Voucher ("${voucher.nameGame}" menjadi "${nameGame}")`
        );
        req.flash("alertStatus", "success");
        res.redirect("/voucher");
      }
    } catch (error) {
      console.log(error);
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/voucher");
    }
  },

  actionDelete: async (req, res) => {
    try {
      const { id } = req.params;
      const { status } = req.body;

      const voucher = await Vouchers.findOne({ _id: id });

      await Vouchers.findOneAndRemove({
        _id: id,
      });

      req.flash(
        "alertMessage",
        `Berhasil menghapus voucher "${voucher.nameGame}"`
      );
      req.flash("alertStatus", "success");

      res.redirect("/voucher");
    } catch (error) {
      console.log(error);
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/voucher");
    }
  },
  actionStatus: async (req, res) => {
    try {
      const { id } = req.params;
      const voucher = await Vouchers.findOne({ _id: id });

      const updateStatus = voucher.status === "Y" ? "N" : "Y";

      await Vouchers.findOneAndUpdate({ _id: id }, { status: updateStatus });

      if (updateStatus === "Y") {
        req.flash("alertMessage", `Berhasil mengaktifkan voucher "${voucher.nameGame}"`);
      } else {
        req.flash("alertMessage", `Berhasil me-nonaktifkan voucher "${voucher.nameGame}"`);
      }
      
      req.flash("alertStatus", "success");
      res.redirect("/voucher");

    } catch (error) {
      console.log(error);
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/voucher");
    }
  },
};
