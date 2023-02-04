const express = require('express');
const mysql = require('mysql');

const app = express();
const connection = mysql.createConnection({
	host: "192.168.200.204",
	user: "kisa-db",
	password: "kisa-db",
	database: "kisa"
});

const PORT = process.env.PORT || 3001;


app.get("/api/teams", (req, res) => {
	let query = connection.query("SELECT * FROM Teams;", (err, rows, fields) => {
		if (err) {
			console.log(err)
			res.status(500);
		}
		res.json(rows);
	});
});

app.get("/api/tasks", (req, res) => {
	let query = connection.query("SELECT * FROM Tasks;", (err, rows, fields) => {
		if (err) {
			console.log(err)
			res.status(500);
		}
		res.json(rows);
	});
});

app.get("/api/task/:id", (req, res) => {
	let query = connection.query(`SELECT * FROM Tasks WHERE id=${req.params.id};`, (err, rows, fields) => {
		if (err) {
			console.log(err)
			res.status(500);
		}
		res.json(rows);
	});
});

app.get("/api/results", (req, res) => {
	let query = connection.query("SELECT Results.TeamId, Results.TaskId, Results.points, Teams.name FROM Results JOIN Teams ON Results.TeamId=Teams.id;", (err, rows, fields) => {
		if (err) {
			console.log(err)
			res.status(500);
			return;
		}
		let results = {};

		for (const row of rows) {
			results[row.TeamId] = results[row.TeamId] || {};
			results[row.TeamId]["name"] = row.name;
			results[row.TeamId][row.TaskId] = row.points;
			results[row.TeamId]["total"] = results[row.TeamId]["total"] + row.points || row.points;
		}

		const finalResults = Object.keys(results)
			.map(key => ({ team: results[key] }));

		console.log(finalResults);

		res.json(finalResults);
	});
});

const parseResults = (rows) => {
	let results = {};

	for (const row of rows) {
		results[row.TeamId] = results[row.TeamId] || {};
		results[row.TeamId]["name"] = row.name;
		results[row.TeamId][row.TaskId] = row.points;
		results[row.TeamId]["total"] = results[row.TeamId]["total"] + row.points || row.points;
	}

	return Object.keys(results).map(key => ({ team: results[key] }));
}

app.listen(PORT, () => {
	console.log(`Listening on  ${PORT}`);
});
