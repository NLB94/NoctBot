const express = require('express');
const passport = require("passport");
const session = require('express-session');
const cors = require('cors')
const app = express();
const {
    client
} = require('../index');
const port = process.env.PORT || 80;
// const routes = require('./src/routes');
const {
    default: Store
} = require('connect-mongo');

require('../backend/strategies/discord')(client);

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

// app.use('/api', routes);
app.use('/discord', passport.authenticate('discord'))

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


// const methodOverride = require('method-override');
const middleware = require('./modules/middleware');
const rateLimit = require('./modules/rate-limiter');
const {
    sendError
} = require('./modules/api-utils');

const authRoutes = require('./routes/auth-routes');
const dashboardRoutes = require('./routes/dashboard-routes');
const rootRoutes = require('./routes/root-routes');
const fetch = require('node-fetch');

setInterval(async () => {
    await fetch('https://i2z7.herokuapp.com').then(() => console.log('Fetched alhamduliLlah !')).catch(() => {})
}, 200000)

app.set('views', __dirname + '/views');
app.set('view engine', 'pug');

app.use(rateLimit);
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(methodOverride('_method'));
// app.use(cookies.express('a', 'b', 'c'));

app.use(express.static(`${__dirname}/assets`));
app.locals.basedir = `${__dirname}/assets`;

app.use('/api', (req, res) => res.json({
    hello: 'earth'
}));
app.use('/api/*', (req, res) => sendError(res, {
    code: 404,
    message: 'Not found.'
}));

app.use('/',
    middleware.updateUser, rootRoutes,
    authRoutes,
    middleware.validateUser, middleware.updateGuilds, dashboardRoutes
);
app.all('*', (req, res) => res.render('errors/404'));

app.listen(port, () => console.log(`Server is live on port ${port}`));