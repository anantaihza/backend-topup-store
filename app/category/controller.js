const Category = require("./model");

module.exports = {
  index: async (req, res) => {
    try {
      const alertMessage = req.flash("alertMessage");
      const alertStatus = req.flash("alertStatus");

      const alert = {
        message: alertMessage,
        status: alertStatus,
      };

      const category = await Category.find();

      res.render("admin/category/view_category", {
        title: "Category",
        category,
        alert,
      });
    } catch (error) {
      console.log(error);
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/category");
    }
  },

  viewCreate: async (req, res) => {
    try {
      res.render("admin/category/create", {
        title: "Create Category",
      });
    } catch (error) {
      console.log(error);
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/category");
    }
  },

  actionCreate: async (req, res) => {
    try {
      const { nameCategory } = req.body;

      let category = await Category({ nameCategory });
      await category.save();

      req.flash("alertMessage", `Berhasil tambah kategori "${nameCategory}"`);
      req.flash("alertStatus", "success");

      res.redirect("/category");
    } catch (error) {
      console.log(error);
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/category");
    }
  },

  viewEdit: async (req, res) => {
    try {
      const { id } = req.params;
      const category = await Category.findOne({ _id: id });

      res.render("admin/category/edit", {
        title: "Edit Kategori",
        category,
      });
    } catch (error) {
      console.log(error);
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/category");
    }
  },

  actionEdit: async (req, res) => {
    try {
      const { id } = req.params;
      const { nameCategory } = req.body;

      const category = await Category.findOne({ _id: id });

      await Category.findOneAndUpdate(
        {
          _id: id,
        },
        { nameCategory }
      );

      req.flash("alertMessage", `Berhasil mengubah kategori ("${category.nameCategory}" menjadi "${nameCategory}")`);
      req.flash("alertStatus", "success");

      res.redirect("/category");
    } catch (error) {
      console.log(error);
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/category");
    }
  },

  actionDelete: async (req, res) => {
    try {
      const { id } = req.params;

      const category = await Category.findOne({ _id: id });

      await Category.findOneAndRemove({
        _id: id,
      });

      req.flash("alertMessage", `Berhasil menghapus kategori "${category.nameCategory}"`);
      req.flash("alertStatus", "success");

      res.redirect("/category");
    } catch (error) {
      console.log(error);
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/category");
    }
  },
};
