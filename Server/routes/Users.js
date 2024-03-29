const express = require('express');
const router = express.Router();
const { Users } = require("../models");
const bcrypt = require("bcryptjs");
const { validateToken } = require('../middleware/AuthMiddleware');
const { sign } = require('jsonwebtoken');


router.post('/', async (req, res) => {
    const { username, password } = req.body;

    const user = await Users.findOne({ where: { username: username } });
    if (user) {
        res.json({ error: "Username already exists. Please choose a new username" });
    } else {

        bcrypt.hash(password, 10).then((hash) => {
            Users.create({
                username: username,
                password: hash
            });
            res.json("Success");
        });
    }
}
);



router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    const user = await Users.findOne({ where: { username: username } });

    if (!user) res.json({ error: "User Does not exist" });

    bcrypt.compare(password, user.password).then((match) => {
        if (!match) res.json({ error: "Wrong Username And Password Combo!" });

        const accessToken = sign(
            { username: user.username, id: user.id },
            "important"
        );
        res.json({ token: accessToken, username: username, id: user.id });
    });
});

router.get('/auth', validateToken, (req, res) => {
    res.json(req.user);
});

router.get('/basicinfo/:id', async (req, res) => {
    const id = req.params.id;
    const user = await Users.findByPk(id, { attributes: { exclude: ['password'] } });
    res.json(user);
});

router.put('/changepassword', validateToken, async (req, res) => {
    const { oldPassword, newPassword } = req.body;
    const user = await Users.findOne({ where: { username: req.user.username } });

    bcrypt.compare(oldPassword, user.password).then(async (match) => {
        if (!match) res.json({ error: "Wrong Old Password!" });

        bcrypt.hash(newPassword, 10).then((hash) => {
            Users.update({
                password: hash
            }, { where: { username: req.user.username } });
            res.json("Success");
        });
    });
});

module.exports = router;