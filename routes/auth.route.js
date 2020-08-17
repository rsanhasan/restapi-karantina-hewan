const router = require('express').Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

require('dotenv').config();
let User = require('../models/users.model');

router.route('/login').post((req, res) => {
    const {username, password} = req.body;
    const secret = process.env.TOKEN_SECRET;

    User.find({'username': username})
    .then(user => {
        if (!user) return res.json("Maaf, username tidak terdaftar!");
        
        const validation = bcrypt.compare(req.body.password, user[0].password)
        if (!validation) return res.json("Maaf, password salah!");
        
        const token = jwt.sign({_id: user[0]._id}, secret);
        res.header('auth-token', token).send(token);
    });
});

module.exports = router;