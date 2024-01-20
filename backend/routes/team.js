const express = require("express");
const router = express.Router();

const connection = require('../db/db');

router.get("/api/teams", (req, res) => {
    connection.query("SELECT * FROM Teams;", (err, rows, fields) => {
        if (err) {
            console.log(err)
            res.status(500);
        }
        res.json(rows);
    });
});

router.post("/api/teams", (req, res) => {
    let newRows = [];
    for (const team of req.body)
        newRows.push([team.id, team.name, 1]);

    connection.query("SET FOREIGN_KEY_CHECKS=0; DELETE FROM Teams; SET FOREIGN_KEY_CHECKS=1; INSERT INTO Teams(id, name, TaskId) VALUES ?;", [newRows], (err, rows, fields) => {
        if (err) {
            console.log(err)
            res.status(500);
        }
    });

    res.send();
});

router.post("/api/team/change-task", (req, res) => {
    connection.query(`UPDATE Teams
                      SET TaskId=${req.body.taskId}
                      WHERE id = ${req.body.teamId};`, (err, fields) => {
        if (err) {
            console.log(err);
            res.status(500);
        }
    });

    res.send();
});

module.exports = router;