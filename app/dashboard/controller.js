module.exports = {
  index: async (req, res) => {
    try {
      res.render("index", {
        title: "Dashboard",
      });
    } catch (error) {
      console.log(error);
    }
  },
};
