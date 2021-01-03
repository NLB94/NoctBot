const { MessageEmbed } = require("discord.js");
const { MESSAGES } = require("../../util/constants");
const moment = require("moment");
const { text } = require("express");

module.exports.run = async (client, message) => {
    const settings = await client.getGuild(message.guild);
    message.guild.members.fetch().then(fetchAll => {
        const offline = fetchAll.filter(m => m.presence.status === 'offline').size;
        const online = fetchAll.filter(m => m.presence.status === 'online').size;
        const dnd = fetchAll.filter(m => m.presence.status === 'dnd').size;
        const idle = fetchAll.filter(m => m.presence.status === 'idle').size;

        const guild = message.guild;
        const author = message.author;
        const botCount = guild.members.cache.filter(members => members.user.bot).size;
        const memberCount = guild.members.cache.filter(members => !members.user.bot).size;
        const bans = guild.fetchBans().size;

        const embed = new MessageEmbed()
        .setAuthor(guild.name, guild.iconURL, 'https://discord.gg/92ffufA')
        .setTitle('Server Info')
        .setURL('https://discordapp.com/oauth2/authorize?client_id=735824367698837555&scope=bot&permissions=2146958847')
        .setThumbnail(guild.iconURL())
        .setTimestamp()
        .setDescription(`**ID** : ${guild.id}`)
        .addFields(
            { name: '• Owner :', value: `${guild.owner.user.tag} \nID : ${guild.ownerID} (<@${guild.ownerID}>)`, inline: false},
            { name: '• Region :', value:`${guild.region}`, inline: true},
            { name: '• Verification Lvl :', value:`${guild.verificationLevel}` , inline: true},
            { name: '• Created at :', value:`${moment(guild.createdAt).format('ddd, DD/MM/YYYY HH:mm')} (${(Math.round(Math.floor(Date.now() - guild.createdAt) / (1000 * 3600 * 24)))} days ago)` , inline: true},
            { name: '• Partner :', value: `${guild.partnered ? 'Yes' : 'No'}`, inline: true},
            { name: '\u200b', value: '\u200b', inline: true},
            { name: '• Verified :', value: `${guild.verified ? 'Yes' : 'No'}`, inline: true},
            { name: '• Vanity URL :', value: `${guild.vanityURLCode == undefined ? 'Not defined' : guild.vanityURLCode}`, inline: false},
            { name: '• System Channel :', value: `${guild.systemChannel == undefined ? 'Not defined' : `<#${guild.systemChannelID}> (${guild.systemChannelID})`}`, inline: true},
            { name: '• Rules Channel :', value: `${guild.rulesChannel == undefined ? 'Not defined' : `${guild.rulesChannel} (${guild.rulesChannelID})`}`, inline: true},
            { name: '• Update Channel :', value: `${guild.publicUpdatesChannel == undefined ? 'Not defined' : `${guild.publicUpdatesChannel} (${guild.publicUpdatesChannelID})`}`, inline: true},
            { name: '• Bans :', value: `${bans}`, inline: false},
            { name: `• Emojis **${guild.emojis.cache.size}** :`, value: `\ Animated : ${guild.emojis.cache.filter(e => e.animated).size} \n\ Normal : ${guild.emojis.cache.filter(e => !e.animated).size}`, inline: true},
            { name: `• Channels Count **${guild.channels.cache.size}** :`, value: `Text Channels : ${guild.channels.cache.filter(c => c.type === "text").size} \nVoice Channels : ${guild.channels.cache.filter(c => c.type === "voice").size} \nCategorys : ${guild.channels.cache.filter(c => c.type === "category").size} \nNews Channels : ${guild.channels.cache.filter(c => c.type === "news").size}`, inline: true},
            { name: '• Roles Count :', value: `${guild.roles.cache.size} \n\ Highest role : ${guild.roles.highest.id} (<@&${guild.roles.highest.id}>)`, inline: true},
            { name: '• Boosts :', value: `${guild.premiumSubscriptionCount} (Level : ${guild.premiumTier})`, inline: false},
            { name: `• Members ***${fetchAll.size}*** :`, value:`Humans : **${memberCount}** \n\ Admins : **${guild.members.cache.filter(m => m.hasPermission('BAN_MEMBERS', { checkAdmin: true})).size}** \n\ \ Online : **${online}** \n\ \ Idle : **${idle}** \n\ \ Do not Disturb : **${dnd}** \n\ \ Offline : **${offline}** \n\ Bots : **${botCount}**  `, inline: false},
            { name: `• Bot Settings in ${guild.name} :`, value:`Type ${settings.general.prefix}botinfo to show bot's settings in ${guild}`, inline: true},
            )
        .setFooter(`Requested by ${author.tag}`, author.avatarURL());
    
                
        message.channel.send(embed);
    });
};

module.exports.help = MESSAGES.COMMANDS.INFO.SERVERINFO;