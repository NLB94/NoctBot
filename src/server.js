require('dotenv').config();
require('./strategies/discord');

const express = require('express');
const passport = require("passport");
const mongoose = require('mongoose'); 
const app = express();
const port = process.env.PORT || 3000;
const routes = require('./routes');

app.use('/api', routes);
app.use('/discord', passport.authenticate( 'discord' )), (req, res) => {
    res.send('hello');
};

app.use(passport.initialize());
app.use(passport.session());

app.listen(port, () => console.log(`Server is live on port ${port}`));