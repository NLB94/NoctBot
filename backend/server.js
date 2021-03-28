const express = require('express');
const app = express();
const passport = require("passport");

const { client } = require('../index')

const session = require('express-session');
const cors = require('cors');

const port = process.env.PORT || 80;
const routes = require('./routes');
const dashboard = require('./pages/dashboard')
const {
    default: Store
} = require('connect-mongo');

require('./strategies/discord')(client);

app.use(express.static("public"))

app.use(express.json())
app.use(express.urlencoded({
    extended: false
}));

app.use(cors({
    origin: ['http://localhost:3000'],
    credentials: true
}))

app.use(session({
    store: Store.create({
        mongoUrl: process.env.DBCONNECTION
    }),
    secret: 'secret',
    cookie: {
        maxAge: 60000 * 60 * 24
    },
    resave: false,
    saveUninitialized: false,
}))

app.use(passport.initialize());
app.use(passport.session());

app.use('/api', routes);
app.use('/discord', passport.authenticate('discord'))
app.use('/dashboard', dashboard)

app.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});

app.get('/info', checkAuth, (req, res) => {
    console.log(req.user.email)
    res.json(req.user);
});

function checkAuth(req, res, next) {
    if (req.isAuthenticated()) return next();
    res.send('not logged in :(');
}

app.listen(port, () => console.log(`Server is live on port ${port}`));
