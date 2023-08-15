const mongoose = require('mongoose')

const categoriesSchema = mongoose.Schema({
    name_category: {
        type: String,
        require: [true, "Nama Kategori tidak boleh kosong."]
    }
})

module.exports = mongoose.model('Categories', categoriesSchema)