const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const animalSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: false,
        trim: true,
        minlength: 3
    },
    jenis_hewan: {type: String, required: true},
    jenis_makanan: {type: String, required: true},
    warna_bulu: {type: String, required: true},
    berat_badan: {type: Number, required: true},
    petugas: {type: String, required: true},
    status: {type: String, required: true},
}, {
    timestamps: true,
});

const Animal = mongoose.model('Animal', animalSchema);
module.exports = Animal;