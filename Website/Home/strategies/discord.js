const passport = require('passport');
const DiscordStrat = require('passport-discord');
const mongoose = require('mongoose')

module.exports = async (client) => {
    const {
        User
    } = require("../../../models");
    console.log('Strategy => done !')
    passport.serializeUser((user, done) => {
        done(null, user.userID)
    });

    passport.deserializeUser(async (userID, done) => {
        try {
            const dbUser = await User.findOne({
                userID: userID
            });
            return dbUser ? done(null, dbUser) : done(null, null)
        } catch (e) {
            console.log(e);
            done(e, null)
        }
    });
    passport.use(new DiscordStrat({
        clientID: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        scope: ['identify', 'guilds', 'email'],
        callbackURL: process.env.CALLBACK_URL
    }, async (accessToken, refreshToken, profile, done) => {
        const {
            id,
            username,
            discriminator,
            email,
            avatar,
            guilds
        } = profile;
        console.log(email)
        try {
            const dbUser = await client.findAndUpdateUser(id, {
                username,
                discriminator,
                avatar,
                guilds,
                email
            })
            if (dbUser) {
                return done(null, dbUser);
            } else {
                const dbUser = await client.createUser({
                    userID: id,
                    discordTag: `${username}#${discriminator}`,
                    avatar,
                    guilds,
                    email
                });
                return done(null, dbUser)
            }
        } catch (e) {
            console.log(e);
            return done(e, null);
        }
    }));
}