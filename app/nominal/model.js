const mongoose = require('mongoose');
const nominalSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    coinQuantity: {
        type: Number,
        default: 0,
    },
    coinName: {
        type: String,
        require: [true, 'nama koin harus diisi'] 
    },
    price: {
        type: Number,
        default: 0
    }

});

module.exports = mongoose.model('nominal', nominalSchema);