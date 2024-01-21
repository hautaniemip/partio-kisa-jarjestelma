const express = require("express");
const router = express.Router();

const connection = require('../db/db');

router.get("/", (req, res) => {
    connection.query("SELECT * FROM Tasks;", (err, rows, fields) => {
        if (err) {
            console.log(err);
            res.status(500);
        }

        res.json(rows);
    });
});

router.post("/", (req, res) => {
    let newRows = [];
    for (const task of req.body)
        newRows.push([task.id, task.name]);

    connection.query("SET FOREIGN_KEY_CHECKS=0; DELETE FROM Tasks; SET FOREIGN_KEY_CHECKS=1; INSERT INTO Tasks(id, name) VALUES ?;", [newRows], (err, rows, fields) => {
        if (err) {
            console.log(err);
            res.status(500);
        }
    });

    res.send();
});

router.get("/:id", (req, res) => {
    connection.query(`SELECT *
                      FROM Tasks
                      WHERE id = ${req.params.id};`, (err, rows, fields) => {
        if (err) {
            console.log(err);
            res.status(500);
        }

        res.json(rows);
    });
});

module.exports = router;