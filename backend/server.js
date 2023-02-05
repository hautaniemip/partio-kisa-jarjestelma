const express = require('express');
const mysql = require('mysql');

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

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

app.post("/api/tasks", (req, res) => {
	connection.query("SET FOREIGN_KEY_CHECKS=0;")
	connection.query("DELETE FROM Tasks;", (err, rows, fields) => {
		if (err) {
			console.log(err)
			res.status(500);
		}
	});
	connection.query("SET FOREIGN_KEY_CHECKS=1;")

	let newRows = [];
	for (const task of req.body)
		newRows.push([task.id, task.name]);
	
	connection.query(`INSERT INTO Tasks(id, name) VALUES ?;`, [newRows], (err, rows, fields) => {
		if (err) {
			console.log(err)
			res.status(500);
		}
	});

	res.send();
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

		const results = parseResults(rows);

		res.json(results);
	});
});

app.get("/api/results/:id", (req, res) => {
	let query = connection.query(`SELECT Results.TeamId, Results.TaskId, Results.points, Teams.name FROM Results JOIN Teams ON Results.TeamId=Teams.id AND Results.TaskId=${req.params.id};`, (err, rows, fields) => {
		if (err) {
			console.log(err)
			res.status(500);
			return;
		}

		const results = parseResults(rows);

		res.json(results);
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
