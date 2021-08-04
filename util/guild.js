const mongoose = require('mongoose')
const {
    Guild
} = require('../models');
const functions = require('./guild');
const func = require('./functions');
const { guildModel2 } = require('./constants');

module.exports = func.client = async (client) => {
    client.createGuild = async guild => {
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
    client.getGuild = async guild => {
        if (!guild) return;
        let data = await Guild.findOne({
            guildID: guild.id
        });
        if (!data) data = await client.createGuild;
        return data;
    };

    client.updateGuild = async (guild, settings) => {
        if (!guild) return;
        let data = await client.getGuild(guild);
        if (typeof data !== "object") data;
        for (const key in settings) {
            if (data[key] !== settings[key]) data[key] = settings[key];
        }
        return data.updateOne(settings);
    };
    client.getGuildUsers = async (guild) => {
        if (!guild) return;
        const data = await client.getGuild(guild);
        return data.users;
    };
    client.createGuildUser = async (guild, user) => {
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
                    messageSent: 0,
                    voiceTime: 0,
                    voiceXP: 0,
                    voiceLvl: 0,
                    voiceXPReq: 250,
                    voiceXPAddReq: 50,
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
                        rob: daily,
                        work: daily,
                        treasure: daily,
                        other: daily
                    },
                    mines: {
                        diamonds: 0,
                        leftNb: 1,
                        other: 0
                    },
                    invites: {
                        total: 0,
                        all: [],
                        leaves: [],
                        regular: 0,
                        regArray: [],
                        fakes: [],
                        bonus: 0,
                        inviterID: ''
                    }
                },
            },
        }).then();
    };
    client.getGuildUser = async (guild, user) => {
        if (!user) return;
        const data = await client.getGuild(guild);
        const position = data.users.map((e) => e.id).indexOf(user.id);
        return data.users[position];
    };
    client.updateGuildUI = (guild, member, options) => {
        Guild.updateOne({
            guildID: guild.id,
            "users.id": member.id
        }, {
            $set: options
        }).then();
    };
    client.resetAllGuilds = async () => {
        let nbSuccess = 0;
        let nbF = 0;
        await client.guilds.fetch();
        console.log(client.guilds.cache.size)
        await client.guilds.cache.forEach(async g => {
            console.log(g.id)
            const guild = await Guild.findOne({
                guildID: g.id
            });
            console.log(guild)
            if (guild) {
                guild.delete().then(async () => {
                    await client.createGuild({ guildID: g.id });
                    nbSuccess++
                });
            }
            else await client.createGuild({guildID: g.id }).then(x => {
                if (!x) nbF++;
                else nbSuccess++;
            });
        })
        return await `Success : ${nbSuccess}\nFailed : ${nbF}`
    }
    client.updateAllGuildsUsers = async (options) => {
        await client.guilds.fetch();
        await client.guilds.cache.forEach(async g => {
            const guild = await Guild.findOne({
                guildID: g.id
            });
            if (guild.users) {
                for (const user in guild.users) {
                    for (const [key, value] of Object.entries(options))
                    guild.users[user][key] = value
                }
            }
            await guild.update(guild);
        })
    }
    client.updateAllGuilds = async function (query) {
        await Guild.updateMany({}, {
            $set: query
        }).then((err, res) => {
            if (err) {
                console.error(err)
            } else {
                console.log(res)
            }
        });
    }
}