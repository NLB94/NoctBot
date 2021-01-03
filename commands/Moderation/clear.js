const { MessageEmbed } = require("discord.js");
const { MESSAGES } = require("../../util/constants");

module.exports.run = async (client, message, args) => {
    const settings = await client.getGuild(message.guild);
    const user = args[1] ? (args[1].startsWith('<@') && args[1].endsWith('>') ? message.mentions.users.first() : (isNaN(args[1]) ? (args[1].includes('#') ? client.users.cache.find(m => m.tag.toLowerCase() == args[1].toLowerCase()) : (message.guild.members.cache.find(m => m.user.username.toLowerCase() == args[1].toLowerCase()) == undefined ? client.users.cache.find(m => m.username.toLowerCase() == args[1].toLowerCase()) : message.guild.members.cache.find(m => m.user.username.toLowerCase() == args[1].toLowerCase()).user)) : client.users.cache.get(args[1]))) : null;
    if (isNaN(args[0])) return message.channel.send(`Correct usage : \`${settings.general.prefix}clear <nb>\``);
    if (!isNaN(args[0]) && args[0] > 1) {
        let messages = await message.channel.messages.fetch({
            limit: Math.min(args[0]),
            before: message.id,
            after: message.channel.messages.cache.find(m => m.createdAt <= (Date.now() - 1209600000)) !== undefined ? message.channel.messages.cache.find(m => m.createdAt <= (Date.now() - 1209600000)) : null
        });

        if (user !== undefined && user !== null) messages = messages.filter(a => a.author.id === user.id).array()
        else messages = messages.filter(m => m.channel.id == message.channel.id)

        
        message.delete();
        if (messages.size < 1) return;
        await message.channel.bulkDelete(messages).then(() => {
            let mesg = user == undefined ? `Successfully cleared ${args[0]} message(s) in ${message.channel}!`: `Successfully cleared ${messages.length} message(s) of ${user} in ${message.channel}!`;
            const embed = new MessageEmbed()
                .setAuthor(message.author.username, message.author.avatarURL())
                .setColor("#ef0f0f")
                .setDescription(mesg);

            message.channel.send(embed).then(msg => {
                setTimeout(() => {
                    msg.delete();
                }, 5000);
            });
        }).catch(() => {
            message.channel.messages.cache.forEach(msg => {
                if (msg.createdAt < (Date.now() / 1209600000) && msg) return;
                else {
                    msg.delete();
                }
            });
        });

    }
};

module.exports.help = MESSAGES.COMMANDS.MODERATION.CLEAR;