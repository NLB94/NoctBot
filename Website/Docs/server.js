const express = require('express');
const app = express();
const passport = require("passport");
const session = require('express-session');
const cors = require('cors');

const port = process.env.PORT || 80;
const {
    default: Store
} = require('connect-mongo');
const {
    default: fetch
} = require('node-fetch');
const mongoose = require('./util/mongoose');

module.exports = async (client) => {
    await mongoose.init();

    await require('./strategies/discord')(client);

    const router = require('./router');
    
    app.use(express.json({ limit: Infinity }))
    app.use(express.urlencoded({
        extended: false
    }));

    app.set('views', __dirname + '/views');
    app.set('view engine', 'pug');

    app.use(express.static(`${__dirname}/assets`));
    app.locals.basedir = `${__dirname}/assets`;


    app.use(cors({
        origin: ['http://localhost'],
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

    app.use('/', router);

    app.all('*', (req, res) => {
        res.render('errors/404');
    })


    app.listen(port, () => console.log(`Server is live on port ${port}`));
}