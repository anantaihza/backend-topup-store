const mongoose = require('mongoose')

const categoriesSchema = mongoose.Schema({
    nameCategory: {
        type: String,
        require: [true, "Nama Kategori tidak boleh kosong."]
    }
})

module.exports = mongoose.model('Categories', categoriesSchema)