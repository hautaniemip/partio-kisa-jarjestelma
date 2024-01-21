const express = require('express');
const cors = require('cors');

require('dotenv').config()

const connection = require('./db/db');
const teamRouter = require('./routes/team');
const taskRouter = require('./routes/task');
const resultRouter = require('./routes/result');
const authRouter = require('./routes/auth');

const app = express();
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cors());

app.use("/api/team", teamRouter);
app.use("/api/task", taskRouter);
app.use("/api/result", resultRouter);
app.use("/api/auth", authRouter);

const PORT = process.env.PORT || 3001;

app.get("/api/status", (req, res) => {
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


app.listen(PORT, () => {
    console.log(`Listening on  ${PORT}`);
});
