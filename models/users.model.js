const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3
    },
    password: {type: String, required: true},
    role: {type: String, required: true},
    biodata: {
        nama_lengkap: {type: String, required: true},
        email: {type: String, required: true},
        tempat_lahir: {type: String, required: false},
        tanggal_lahir: {type: String, required: false},
        alamat: {type: String, required: false},
        nomor_hp: {type: String, required: false},
        foto_profil: {type: String, required: false}
    }
}, {
    timestamps: true,
});

const User = mongoose.model('User', userSchema);
module.exports = User;