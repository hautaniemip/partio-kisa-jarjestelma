const express = require('express');
const session = require('express-session');
const cors = require('cors');
const cookieParser = require('cookie-parser')
const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;

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
app.use(cookieParser())

app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {secure: false}
}));
app.use(passport.initialize());
app.use(passport.session());

const cookieExtractor = (req) => {
    let token = null;
    if (req && req.cookies) {
        token = req.cookies['access_token'];
    }
    return token;
}

passport.use(new JwtStrategy({
    jwtFromRequest: cookieExtractor,
    secretOrKey: process.env.SECRET
}, (jwtPayload, done) => {
    connection.query(`SELECT *
                      FROM Users
                      WHERE name = "${jwtPayload.username}"`, (err, rows, fields) => {
        if (!rows)
            return done(null, false);
        return done(null, rows[0]);
    });
}));

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});

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
