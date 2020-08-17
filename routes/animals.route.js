const router = require('express').Router();
const verify = require('./verify.route');
let Animal = require('../models/animals.model');

router.route('/').get(verify, (req, res) => {
    Animal.find()
        .then(animals => res.json(animals))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post(verify, (req, res) => {
    // console.log(req)
    const {name, jenis_hewan, jenis_makanan, warna_bulu, berat_badan, petugas} = req.body;
    
    const status = 'diproses'
    const jenisMakanan = ['Herbivora', 'Omnivora', 'Karnivora'];
    // const statusPengajuan = ['disetujui', 'ditolak', 'diproses'];

    if (!jenisMakanan.includes(jenis_makanan)){
        res.status(400).json(`Jenis Makanan ${jenis_makanan} tidak tersedia atau salah`);
    }else{
        const newAnimal = new Animal({
            name,
            jenis_hewan,
            jenis_makanan,
            warna_bulu,
            berat_badan,
            petugas,
            status
        });    
        newAnimal.save()
            .then(() => res.json('Hewan berhasil dibuat!'))
            .catch(err => res.status(400).json('error: ' + err));
    }


});

module.exports = router;