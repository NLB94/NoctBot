const express = require('express');
const app = express();
const passport = require("passport");
const session = require('express-session');
const cors = require('cors');

const port = process.env.PORT || 80;
const router = require('./router');
const {
    default: Store
} = require('connect-mongo');
const {
    default: fetch
} = require('node-fetch');

module.exports = async (client) => {
    require('./strategies/discord')(client);

    app.use(express.json())
    app.use(express.urlencoded({
        extended: false
    }));

    app.set('views', __dirname + '/views');
    app.set('view engine', 'pug');

    app.use(express.static(`${__dirname}/assets`));
    app.locals.basedir = `${__dirname}/assets`;


    // app.get('/', (req, res) => {
    //     res.render('index')
    // });

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