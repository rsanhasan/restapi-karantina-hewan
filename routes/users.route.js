const router = require('express').Router();
const verify = require('./verify.route');
const bcrypt = require('bcrypt');
let User = require('../models/users.model');

router.route('/').get(verify, (req, res) => {
    User.find()
        .then(users => res.json(users))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/superadmin/:id').post(verify, (req, res) => {
    User.find({'role': 'superadmin'})
        .then(superadmin => {
            if (superadmin.length != 0) return res.json("Maaf, inject superadmin tidak tersedia!");

            User.findById(req.params.id)
            .then( user => {
                if(user.role != 'admin') return res.json("Maaf, inject superadmin tidak tersedia!")

                user.role = 'superadmin';    
                user.save()
                    .then(() => res.json("Inject Superadmin berhasil digunakan!."))
                    .catch(err => res.status(400).json('Error: ' + err));
                }
            );
        })
});

router.route('/add').post(verify, (req, res) => {
    const {username, role, biodata} = req.body;
    const roleAccess = ['superadmin', 'admin', 'petugas'];
    const saltRounds = 10;
    
    if (!roleAccess.includes(role)){
        return res.status(400).json(`Role ${role} tidak tersedia atau salah`);
    }

    bcrypt.hash(req.body.password, saltRounds)
        .then((password) => {
            const newUser = new User({
                username,
                password,
                role,
                biodata
            });

            console.log(newUser);

            newUser.save()
                .then(() => res.json('User berhasil dibuat!'))
                .catch(err => res.status(400).json('error: ' + err));
        })
        .catch(err => res.status(400).json('error: ' + err));
    
});

router.route('/:id').delete(verify, (req, res) => {
    User.findByIdAndDelete(req.params.id)
        .then(() => res.json('User berhasil dihapus.'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').put(verify, (req, res) => {
    User.findById(req.params.id)
    .then(user => {
        const {username, password, biodata} = req.body;
        console.log(password);
        const salt = bcrypt.genSalt(10);
        const hashedPassword = bcrypt.hash(password, salt);
        console.log(hashedPassword)
        user.username = username;
        user.password = hashedPassword;
        // user.role = user.role;
        user.biodata = biodata;

        user.save()
            .then(() => res.json("User berhasil diperbaharui!."))
            .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;