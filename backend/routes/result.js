const express = require("express");
const router = express.Router();

const connection = require('../db/db');

router.get("/", (req, res) => {
    connection.query("SELECT Results.TeamId, Results.TaskId, Results.points, Teams.name FROM Results JOIN Teams ON Results.TeamId=Teams.id;", (err, rows, fields) => {
        if (err) {
            console.log(err)
            res.status(500);
            return;
        }

        const results = parseResults(rows);

        res.json(results);
    });
});

router.get("/:id", (req, res) => {
    connection.query(`SELECT Results.TeamId, Results.TaskId, Results.points, Results.time, Teams.name
                      FROM Results
                               JOIN Teams ON Results.TeamId = Teams.id AND Results.TaskId = ${req.params.id};`, (err, rows, fields) => {
        if (err) {
            console.log(err)
            res.status(500);
            return;
        }

        const results = parseResults(rows);

        res.json(results);
    });
});

router.post("/", (req, res) => {
    connection.query(`DELETE
                      FROM Results
                      WHERE TaskId = ${req.body.taskId}
                        AND TeamId = ${req.body.teamId};`, (err, rows, fields) => {
        if (err) {
            console.log(err);
            res.status(500);
        }
    });

    connection.query(`INSERT INTO Results(TaskId, TeamId, points, time)
                      VALUES (${req.body.taskId}, ${req.body.teamId}, ${req.body.points},
                              NULLIF("${req.body.time}", "null"));`, (err, rows, fields) => {
        if (err) {
            console.log(err);
            res.status(500);
        }
    });

    res.send();
});

const parseResults = (rows) => {
    let results = {};

    for (const row of rows) {
        results[row.TeamId] = results[row.TeamId] || {};
        results[row.TeamId]["id"] = row.TeamId;
        results[row.TeamId]["name"] = row.name;
        results[row.TeamId][row.TaskId] = row.points || 0;
        results[row.TeamId]["times"] = results[row.TeamId]["times"] || {};
        results[row.TeamId]["times"][row.TaskId] = row.time;
        results[row.TeamId]["total"] = results[row.TeamId]["total"] + row.points || row.points;
    }

    return Object.keys(results).map(key => ({team: results[key]}));
}

module.exports = router;