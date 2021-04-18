const {
    MessageEmbed
} = require("discord.js");
const {
    MESSAGES
} = require("../../util/constants");
const moment = require("moment");

const functions = require("../../util/functions");

module.exports.run = functions.run = async (client, message, args, settings, userInfo) => {
    
    message.guild.members.fetch().then(fetchAll => {
        const emojis = client.emojis;
        const offline = fetchAll.filter(m => m.presence.status === 'offline').size,
            offlineEmoji = emojis.resolve(client.localEmojis.offline);
        const online = fetchAll.filter(m => m.presence.status === 'online').size,
            onlineEmoji = '🟢';
        const dnd = fetchAll.filter(m => m.presence.status === 'dnd').size,
            dndEmoji = emojis.resolve(client.localEmojis.dnd);
        const idle = fetchAll.filter(m => m.presence.status === 'idle').size,
            idleEmoji = emojis.resolve(client.localEmojis.idle);

        const guild = message.guild;
        const author = message.author;
        const botCount = guild.members.cache.filter(members => members.user.bot).size;
        const memberCount = guild.members.cache.filter(members => !members.user.bot).size;
        // const bans = guild.fetchBans().length;
        const channels = guild.channels.cache;
        const roles = guild.roles;

        const animatedEmojis = guild.emojis.cache.filter(e => e.animated);
        const normalEmojis = guild.emojis.cache.filter(e => !e.animated);

        const embed = new MessageEmbed()
            .setAuthor(guild.name, guild.iconURL, `${client.botGuild.supportInvite}`)
            .setTitle('Server Info')
            .setURL(`https://discord.com/oauth2/authorize?client_id=${client.user.id}&permissions=2146958847&response_type=code&scope=identify%20applications.commands%20bot%20guilds%20guilds.join`)
            .setThumbnail(guild.iconURL())
            .setTimestamp()
            .setDescription(`${emojis.resolve(client.localEmojis.id)}${guild.id}`)
            .addFields({
                    name: `${emojis.resolve(client.localEmojis.owner)}Owner :`,
                    value: `${guild.owner.user.tag} \nID : ${guild.ownerID} (<@${guild.ownerID}>)`,
                    inline: false
                }, {
                    name: '• Region :',
                    value: `${guild.region}`,
                    inline: true
                }, {
                    name: '• Verification Lvl :',
                    value: `${guild.verificationLevel}`,
                    inline: true
                }, {
                    name: '• Created at :',
                    value: `${moment(guild.createdAt).format('ddd, DD/MM/YYYY HH:mm')} (${(Math.round(Math.floor(Date.now() - guild.createdAt) / (1000 * 3600 * 24)))} days ago)`,
                    inline: true
                }, {
                    name: '• Partner :',
                    value: `${guild.partnered ? `${emojis.resolve(client.localEmojis.checkMark)}` : `${emojis.resolve(client.localEmojis.x_mark)}`}`,
                    inline: true
                }, {
                    name: '\u200b',
                    value: '\u200b',
                    inline: true
                }, {
                    name: `• Verified :`,
                    value: `${guild.verified ? `${emojis.resolve(client.localEmojis.checkMark)}` : `${emojis.resolve(client.localEmojis.x_mark)}`}`,
                    inline: true
                }, {
                    name: '• Vanity URL :',
                    value: `${guild.vanityURLCode == undefined ? 'Not defined' : guild.vanityURLCode}`,
                    inline: false
                },
                // {
                //     name: '• System Channel :',
                //     value: `${guild.systemChannel == undefined ? 'Not defined' : `<#${guild.systemChannelID}> (${guild.systemChannelID})`}`,
                //     inline: true
                // }, {
                //     name: '• Rules Channel :',
                //     value: `${guild.rulesChannel == undefined ? 'Not defined' : `${guild.rulesChannel} (${guild.rulesChannelID})`}`,
                //     inline: true
                // }, {
                //     name: '• Update Channel :',
                //     value: `${guild.publicUpdatesChannel == undefined ? 'Not defined' : `${guild.publicUpdatesChannel} (${guild.publicUpdatesChannelID})`}`,
                //     inline: true
                // }, {
                //     name: '• Bans :',
                //     value: `${bans}`,
                //     inline: false
                // },
                {
                    name: '\u200b',
                    value: `\u200b`,
                    inline: true
                }, {
                    name: `${emojis.resolve(client.localEmojis.emojis)} Emojis **${guild.emojis.cache.size}** :`,
                    value: `\u200b`,
                    inline: true
                }, {
                    name: '\u200b',
                    value: `\u200b`,
                    inline: true
                }, {
                    name: `Animated **${animatedEmojis.size}**:`,
                    value: `${animatedEmojis.array().slice(0, 25).join("") !== '' ? animatedEmojis.array().slice(0, 25).join("") : '\u200b'}`,
                    inline: true
                }, {
                    name: `\u200b`,
                    value: `${animatedEmojis.array().slice(25, 50).join("") !== '' ? animatedEmojis.array().slice(25, 50).join("") : '\u200b'}`,
                    inline: true
                }, {
                    name: `\u200b`,
                    value: `${animatedEmojis.array().slice(50, 75).join("") !== '' ? animatedEmojis.array().slice(50, 75).join("") : '\u200b'}`,
                    inline: true
                }, {
                    name: `Normal **${normalEmojis.size}**:`,
                    value: `${normalEmojis.array().slice(0, 25).join("") !== '' ? normalEmojis.array().slice(0, 25).join("") : '\u200b'}`,
                    inline: true
                }, {
                    name: `\u200b`,
                    value: `${normalEmojis.array().slice(25, 50).join("") !== '' ? normalEmojis.array().slice(25, 50).join("") : '\u200b'}`,
                    inline: true
                }, {
                    name: `\u200b`,
                    value: `${normalEmojis.array().slice(50, 75).join("") !== '' ? normalEmojis.array().slice(50, 75).join("") : '\u200b'}`,
                    inline: true
                }, {
                    name: `• All Members ***${fetchAll.size}*** :`,
                    value: `${emojis.resolve(client.localEmojis.members)} Members : **${memberCount}**\nBots : **${botCount}** \n${emojis.resolve(client.localEmojis.admins)}Admins : **${guild.members.cache.filter(m => m.hasPermission('BAN_MEMBERS', { checkAdmin: true})).size}** \n${onlineEmoji}Online : **${online}** \n${idleEmoji}Idle : **${idle}** \n${dndEmoji}Do not Disturb : **${dnd}** \n${offlineEmoji}Offline : **${offline}**`,
                    inline: false
                }, {
                    name: `• Channels **${channels.size}** :`,
                    value: `Categorys : ${channels.filter(c => c.type === "category").size} \n${emojis.resolve(client.localEmojis.textChannels)} Text : ${channels.filter(c => c.type === "text", c => c.type == 'news').size} \n${emojis.resolve(client.localEmojis.voiceChannels)} Voice : ${channels.filter(c => c.type === "voice").size}`,
                    inline: true
                }, {
                    name: '• Roles :',
                    value: `${roles.cache.size} \nHighest : ${roles.highest.id} (<@&${roles.highest.id}>)`,
                    inline: true
                }, {
                    name: `${emojis.resolve(client.localEmojis.boost)} Boosts :`,
                    value: `${guild.premiumSubscriptionCount} \nLevel : ${guild.premiumTier}`,
                    inline: false
                }, {
                    name: `${emojis.resolve(client.localEmojis.settings)} Bot Settings :`,
                    value: `\`${settings.general.prefix}bot-settings\` to show bot's settings`,
                    inline: true
                },
            )
            .setFooter(`Requested by ${author.tag}`, author.avatarURL());

        message.channel.send(embed);
    });
};

module.exports.help = MESSAGES.COMMANDS.INFO.SERVERINFO;

function newFunction(client) {
    return client.emojis;
}
