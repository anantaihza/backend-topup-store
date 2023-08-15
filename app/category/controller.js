const Category = require("./model");

module.exports = {
  index: async (req, res) => {
    try {
      const category = await Category.find();

      res.render("admin/category/view_category", {
        title: "Category",
        category,
      });
    } catch (error) {
      console.log(error);
    }
  },

  viewCreate: async (req, res) => {
    try {
      res.render("admin/category/create", {
        title: "Create Category",
      });
    } catch (error) {
      console.log(error);
    }
  },

  actionCreate: async (req, res) => {
    try {
      const { name_category } = req.body;

      let category = await Category({ name_category });
      await category.save();

      res.redirect("/category");
    } catch (error) {
      console.log(error);
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
    }
  },

  actionEdit: async (req, res) => {
    try {
      const { id } = req.params;
      const { name_category } = req.body;

      const category = await Category.findOneAndUpdate(
        {
          _id: id,
        },
        { name_category }
      );

      res.redirect("/category");
    } catch (error) {
      console.log(error);
    }
  },

  actionDelete: async (req, res) => {
    try {
      const { id } = req.params

      const category = await Category.findOneAndRemove({
        _id: id
      })
      
      res.redirect('/category')
      
    } catch (error) {
      console.log(error)
    }
  }
};
