module.exports = {
    index: async (req, res) => {
try {
    res.render('admin/category/view_category', {
        title: "Category"
    })
} catch (error) {
    console.log(error)
}
    }
}