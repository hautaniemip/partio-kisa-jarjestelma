const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const passport = require("passport");

const connection = require('../db/db');
const roles = require('../roles')

const router = express.Router();


router.post("/login", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    connection.query(`SELECT *
                      FROM Users
                      WHERE name = "${req.body.username}";`, (err, rows, fields) => {
        if (err)
            console.log(err);

        const user = rows[0];
        if (!user || !bcrypt.compareSync(password, user.password)) {
            res.status(401).send("Invalid username or password");
            return;
        }

        const token = jwt.sign({username: user.name, role: user.role}, process.env.SECRET);
        res.cookie('access_token', token, {
            maxAge: 4 * 3600000,
            httpOnly: true
        })
        res.send()
    });
});

router.post("/add-user", passport.authenticate('jwt'), (req, res) => {
    const token = req.cookies['access_token']
    const decoded_token = jwt.verify(token, process.env.SECRET);

    if (decoded_token.role !== roles.admin) {
        res.status(403).send();
        return;
    }

    const username = req.body.username;
    const password = req.body.password;
    const role = req.body.role;
    const hash = bcrypt.hashSync(password);

    connection.query(`SELECT *
                      FROM Users
                      WHERE name = "${req.body.username}";`, (err, rows, fields) => {
        if (err)
            console.log(err);


        if (rows.length > 0) {
            res.status(400).send("User name is already used");
            return;
        }

        connection.query("INSERT INTO Users(name, password, role) VALUES ?;", [[[username, hash, role]]], (err, rows, fields) => {
            if (err)
                console.log(err);

            res.send();
        });
    });
});

module.exports = router;