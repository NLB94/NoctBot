const functions = require('./message');
const {
    Message,
    MessageEmbed
} = require('discord.js');
const func = require('./functions');

module.exports = func.client = async client => {
    const x_mark = client.emojis.resolve('806440609127596032');

    client.levelSystem = functions.levelSystem = async (message, settings, userInfo) => {
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
            client.levelUp(message.guild, message.member, userInfo)

            let typeMsg = settings.levelSystem.message.embed.enable ? MessageEmbed : Message;
            let msg = typeMsg = MessageEmbed ? settings.levelSystem.message.normalMsg.msg : settings.levelSystem.message.embed.data;
            if (typeMsg = Message && msg == '') msg = 'GG {user}, you reached level **{level}**!';
            if (typeMsg = Message) msg = client.replaceLevelText(msg, message, {
                newLvl: (oldLvl + 1)
            })
            // else if (typeMsg = MessageEmbed) msg = client.replaceLevelEmbed(msg, message, { newLvl: (oldLvl + 1) })

            let channel = settings.levelSystem.channel;
            if (channel == '') channel = message.channel;
            channel.send(`${msg}`);

            if (settings.levelSystem.DM.enable) {
                let msgDm = settings.levelSystem.DM.message
                if (msgDm == '') msgDm = msg;
                message.author.send(`${msgDm}`);
            }
        };
    }
    client.notStartByPrefix = functions.notStartByPrefix = async (message, settings, userInfo) => {
        const arrowRight = client.emojis.resolve('770976808899444776');
        if (message.content.startsWith('~help') && settings.general.prefix !== '~') await message.channel.send({
            embed: {
                description: `${arrowRight}My prefix in this server is \`${settings.general.prefix}\``
            }
        });
        if (message.content.startsWith("<@") || message.content.includes('<@')) {
            if (message.content.includes("<@!735824367698837555>") || message.content.includes("<@735824367698837555>")) message.channel.send({
                embed: {
                    description: `${arrowRight}My prefix in this server is \`${settings.general.prefix}\``
                }
            })
        };
        client.updateGuildUI(message.guild, message.member, { "users.$.messageSent": (parseInt(userInfo.messageSent) + 1)})
        client.levelSystem(message, settings, userInfo);
    };
}