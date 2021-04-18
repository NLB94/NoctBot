const functions = require('./message');
const {
    Message,
    MessageEmbed
} = require('discord.js');
const func = require('./functions');

module.exports = func.client = async client => {
    const x_mark = client.emojis.resolve('806440609127596032');

    client.notStartByPrefix = functions.notStartByPrefix = async (message, settings, userInfo) => {
        const arrowRight = client.emojis.resolve('770976808899444776');
        if (message.content.startsWith('~help') && settings.general.giveawayPrefix !== '~') await message.channel.send({
            embed: {
                description: `${arrowRight}My prefix in this server is \`${settings.general.giveawayPrefix}\``
            }
        });
        if (message.content.startsWith("<@") || message.content.includes('<@')) {
            if (message.content.includes(client.user.id) || message.content.includes(client.user.id)) message.channel.send({
                embed: {
                    description: `${arrowRight}My prefix in this server is \`${settings.general.giveawayPrefix}\``
                }
            })
        };
        client.updateGuildUI(message.guild, message.member, {
            "users.$.messageSent": (parseInt(userInfo.messageSent) + 1)
        })

        if (!settings.levelSystem.enable) return;
        const expCd = Math.floor(Math.random() * 19) + 1;
        const expAdd = Math.floor(Math.random() * 25) + (10 * settings.levelSystem.boost);

        if (expCd >= 8 && expCd <= 12) {
            const newXP = userInfo.XP + expAdd;
            await client.updateGuildUI(message.guild, message.member, {
                "users.$.XP": newXP
            })
        };
        const oldLvl = userInfo.level;
        const xp = userInfo.XP;
        const xpreq = userInfo.XPRequire;

        if (xp < xpreq) return;
        else if (xp >= xpreq) {
            const xpToAddReq = userInfo.XPtoAddReq;

            const XPreqUp = xpreq + 250 + xpToAddReq;
            const newLvl = oldLvl + 1;
            const newAddReq = xpToAddReq + 50;
            const newXP = xp - xpreq;

            await client.updateGuildUI(message.guild, message.member, {
                "users.$.XP": newXP
            });
            await client.updateGuildUI(message.guild, message.member, {
                "users.$.XPRequire": XPreqUp
            });
            await client.updateGuildUI(message.guild, message.member, {
                "users.$.level": newLvl
            });
            await client.updateGuildUI(message.guild, message.member, {
                "users.$.XPtoAddReq": newAddReq
            });

            let typeMsg = settings.levelSystem.message.type == 'embed' ? MessageEmbed : Message;
            let msg = typeMsg !== MessageEmbed ? settings.levelSystem.message.msg : new MessageEmbed(settings.levelSystem.message.msg);
            if (typeMsg === Message && (msg == '' || !msg)) msg = 'GG {user}, you reached level **{level}**!';
            
            if (typeMsg === Message) msg = await client.replaceLevelText(msg, message, {
                newLvl: (oldLvl + 1)
            })
            // else if (typeMsg = MessageEmbed) msg = await client.replaceLevelEmbed(msg, message, { newLvl: (oldLvl + 1) })

            if (settings.levelSystem.channel !== undefined) {
                let channel = message.guild.channels.resolve(settings.levelSystem.channel);
                if (channel == '' || !channel || channel == undefined) channel = message.channel;
                channel.send(msg)

                if (settings.levelSystem.DM.enable) {
                    let msgDm = settings.levelSystem.DM.message
                    if (msgDm == '') msgDm = msg;
                    message.author.send(`${msgDm}`);
                }
            }
        };
    };
}