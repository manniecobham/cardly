const express = require('express');
const router = express.Router();
const { Users } = require("../models");
const bcrypt = require("bcrypt");
const {validateToken} = require('../middleware/AuthMiddleware')

const { sign } = require('jsonwebtoken');


router.post('/', async (req, res) => {
    const { username, password } = req.body;
    await bcrypt.hash(password, 10).then((hash) => {
        Users.create({
            username: username,
            password: hash
        });
        res.json("Success");
    });
});


router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    const userDetail = await Users.findOne({ where: { username: username } });
    
    if (!userDetail) res.json({ error: "User Does not exist" });

    bcrypt.compare(password, userDetail.password).then((match) => {
        if (!match) res.json({ error: "Wrong Username And Password Combo!" });

        const accessToken = sign(
            { username: userDetail.username, id: userDetail.id },
            "important"
        );
        res.json(accessToken);
    });
});

router.get('/auth', validateToken, (req, res) => {
    res.json(req.user);
})

module.exports = router;