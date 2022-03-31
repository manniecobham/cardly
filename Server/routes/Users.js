const express = require('express');
const router = express.Router();
const { Users } = require("../models");
const bcrypt = require("bcrypt");


router.post('/', async (req, res) => {
    const { username, password } = req.body;
    await bcrypt.hash(password, 10).then((hash) => {
        Users.create({
            username: username,
            password: hash
        })
    });
    res.json("Success");
});

router.post('/login', async (req, res) => {
    const { username, password} = req.body;
    const user = await Users.findOne({ where: { username: username}});
    if(!user) res.json({error: "User Does not exist"});
    bcrypt.compare(password, user.password).then((match) =>{
        if(!match) res.json({error: "Wrong Username And Password Combo!"});
        res.json("You Logged In!!!")
    });
});

module.exports = router;