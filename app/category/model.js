const mongoose = require('mongoose');
const categoriSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {
        type: String,
        require: [true, "Nama Kategori harus di isi"]
    },

});

module.exports = mongoose.model('categori', categoriSchema);