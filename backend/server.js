const express = require('express');
const cors = require('cors');
const mysql = require('mysql');

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

const connection = mysql.createPool({
	host: "192.168.200.204",
	user: "kisa-db",
	password: "kisa-db",
	database: "kisa",
	connectionLimit: 4,
	multipleStatements: true
});

const PORT = process.env.PORT || 3001;

app.get("/api/ping", (req, res) => {
	connection.query("SHOW TABLES;", (err, rows, fields) => {
		let responseText = "OK";
		if (err) {
			console.log(err);
			res.status(500);
			responseText = "No database connection";
		}
		res.write(responseText);
		res.send();
	});
});

app.get("/api/teams", (req, res) => {
	let query = connection.query("SELECT * FROM Teams;", (err, rows, fields) => {
		if (err) {
			console.log(err)
			res.status(500);
		}
		res.json(rows);
	});
});

app.post("/api/teams", (req, res) => {
	//connection.query("SET FOREIGN_KEY_CHECKS=0;")
	let newRows = [];
	for (const team of req.body)
		newRows.push([team.id, team.name, 1]);

	connection.query("SET FOREIGN_KEY_CHECKS=0; DELETE FROM Teams; SET FOREIGN_KEY_CHECKS=1; INSERT INTO Teams(id, name, TaskId) VALUES ?;", [newRows], (err, rows, fields) => {
		if (err) {
			console.log(err)
			res.status(500);
		}
	});
	//connection.query("SET FOREIGN_KEY_CHECKS=1;")

	
	
	// connection.query(`INSERT INTO Teams(id, name, TaskId) VALUES ?;`, [newRows], (err, rows, fields) => {
	// 	if (err) {
	// 		console.log(err)
	// 		res.status(500);
	// 	}
	// });

	res.send();
});

app.post("/api/team/change-task", (req, res) => {
	connection.query(`UPDATE Teams SET TaskId=${req.body.taskId} WHERE id=${req.body.teamId};`, (err, fields) => {
		if (err) {
			console.log(err)
			res.status(500);
		}
	});


	res.send();
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
	//connection.query("SET FOREIGN_KEY_CHECKS=0;")
	let newRows = [];
	for (const task of req.body)
		newRows.push([task.id, task.name]);

	connection.query("SET FOREIGN_KEY_CHECKS=0; DELETE FROM Tasks; SET FOREIGN_KEY_CHECKS=1; INSERT INTO Tasks(id, name) VALUES ?;", [newRows], (err, rows, fields) => {
		if (err) {
			console.log(err)
			res.status(500);
		}
	});
	//connection.query("SET FOREIGN_KEY_CHECKS=1;")
	
	// connection.query(`INSERT INTO Tasks(id, name) VALUES ?;`, [newRows], (err, rows, fields) => {
	// 	if (err) {
	// 		console.log(err)
	// 		res.status(500);
	// 	}
	// });

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
	let query = connection.query(`SELECT Results.TeamId, Results.TaskId, Results.points, Results.time, Teams.name FROM Results JOIN Teams ON Results.TeamId=Teams.id AND Results.TaskId=${req.params.id};`, (err, rows, fields) => {
		if (err) {
			console.log(err)
			res.status(500);
			return;
		}

		const results = parseResults(rows);

		res.json(results);
	});
});

app.post("/api/results", (req, res) => {
	connection.query(`DELETE FROM Results WHERE TaskId=${req.body.taskId} AND TeamId=${req.body.teamId};`, (err, rows, fields) => {
		if (err) {
			console.log(err)
			res.status(500);
		}
	});

	connection.query(`INSERT INTO Results(TaskId, TeamId, points, time) VALUES (${req.body.taskId}, ${req.body.teamId}, ${req.body.points}, NULLIF("${req.body.time}", "null"));`, (err, rows, fields) => {
		if (err) {
			console.log(err)
			res.status(500);
		}
	});

	res.send();
});

connection.on('error', (err) => {
	console.log(err);
});

const parseResults = (rows) => {
	let results = {};

	for (const row of rows) {
		results[row.TeamId] = results[row.TeamId] || {};
		results[row.TeamId]["name"] = row.name;
		results[row.TeamId][row.TaskId] = row.points || 0;
		results[row.TeamId]["times"] = results[row.TeamId]["times"] || {};
		results[row.TeamId]["times"][row.TaskId] = row.time;
		results[row.TeamId]["total"] = results[row.TeamId]["total"] + row.points || row.points;
	}

	return Object.keys(results).map(key => ({ team: results[key] }));
}

app.listen(PORT, () => {
	console.log(`Listening on  ${PORT}`);
});
