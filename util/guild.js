const mongoose = require('mongoose')
const { Guild } = require('../models/main');
const functions = require('./guild');
const func = require('./functions')

module.exports = func.client = async (client) => {
    client.createGuild = functions.createGuild = async guild => {
        if (!guild) return;
        const merged = Object.assign({
            _id: mongoose.Types.ObjectId()
        }, guild);
        const createGuild = await new Guild(merged);
        createGuild.save()
        const data = await Guild.findOne({
            guildID: guild.guildID
        });
        if (data) return data;
    };
    client.getGuild = functions.getGuild = async guild => {
        if (!guild) return;
        let data = await Guild.findOne({
            guildID: guild.id
        });
        if (!data) data = await client.createGuild;
        return data;
    };

    client.updateGuild = functions.updateGuild = async (guild, settings) => {
        if (!guild) return;
        let data = await client.getGuild(guild);
        if (typeof data !== "object") data = {};
        for (const key in settings) {
            if (data[key] !== settings[key]) data[key] = settings[key];
        }
        return data.updateOne(settings);
    };
    client.getGuildUsers = functions.getGuildUsers = async (guild) => {
        if (!guild) return;
        const data = await client.getGuild(guild);
        return data.users;
    };
    client.createGuildUser = functions.createUser = async (guild, user) => {
        if (!guild || !user) return;
        const dailyCd = Date.now() - 8.64e+7;
        const daily = new Date(dailyCd);
        Guild.updateOne({
            guildID: guild.id
        }, {
            $push: {
                users: {
                    id: user.id,
                    XP: 0,
                    level: 0,
                    XPRequire: 250,
                    XPtoAddReq: 50,
                    warns: 0,
                    mutes: 0,
                    afk: {
                        enable: false,
                        message: ''
                    },
                    moneyBank: 0,
                    moneyCash: 0,
                    inventory: [],
                    cd: {
                        daily: daily,
                        hourly: daily,
                        rob: daily
                    }
                },
            },
        }).then();
    };
    client.getGuildUser = functions.getUser = async (guild, user) => {
        if (!user) return;
        const data = await client.getGuild(guild);
        const position = data.users.map((e) => e.id).indexOf(user.id);
        return data.users[position];
    };
    client.updateGuildUI = functions.updateUI = (guild, member, options = {}) => {
        Guild.updateOne({
            guildID: guild.id,
            "users.id": member.id
        }, {
            $set: options
        }).then();
    };
    client.resetAllGuilds = functions.resetAllGuilds = async () => {
        await Guild.deleteOne({guildID: 727494941911154688}).then()
        await client.createGuild({guildID: 727494941911154688})
        await client.guilds.cache.forEach(async g => {
            await Guild.deleteOne({guildID: g.id}).then()
            await client.createGuild({ guildID: g.id })
        });
    }
}