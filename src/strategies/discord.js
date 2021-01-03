const passport = require('passport');
const DiscordStrat = require('passport-discord')
const User = require("../database/schemas/user");

passport.serializeUser(  ( user, done ) => {
    done(null, user.discordId)
});

passport.deserializeUser(async (discordId, done) => {
    try {
        const dbUser = await User.findOne({ discordId });
        return dbUser ? done(null, dbUser): done(null, null);
    }
    catch (e) {
        console.log(e);
        done(e, null);
    }
});
passport.use(new DiscordStrat({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    scope: ['identify', 'guilds', 'email'],
}, async (accessToken, refreshToken, profile, done) => {
    const { id, username, discriminator, avatar, guilds } = profile;
    console.log( id, username, discriminator, avatar, guilds );
    try { 
        const dbUser = await User.findOneAndUpdate({ discordId: id }, {
        discordTag: `${username}#${discriminator}`,
        avatar,
        guilds,
    }, { new: true });
    if ( dbUser ) {
        console.log('User trouvée alhamdulillah !');
        return done( null, dbUser );
    }
    else {
        const dbUser = await User.create({
        discordId: id,
        discordTag: `${username}#${discriminator}`,
        avatar,
        guilds, 
        });
        return done(null, dbUser);
    }}
    catch(e) {
        console.log(e);
        return done( e, null );
    }
})
);