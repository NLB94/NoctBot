const {
    MessageEmbed
} = require('discord.js');
const { getStrings } = require('../../../util/constants');
const func = require("../../../util/functions");
const defaultPrefix = '~';

module.exports = func.run = async (client, message, args) => {
    const guild = await client.guilds.resolve('727494941911154688')
    const suggestChannel = await guild.channels.resolve('824287705504153610');
    const reportChannel = await guild.channels.resolve('797799949047562260');
    const strings = await getStrings(client, "en");
    if (message.author.bot) return;
    const warning = client.emojis.resolve(client.localEmojis.warning);
    const check_mark = client.emojis.resolve(client.localEmojis.checkMark)
    const user = message.author;

    args = await message.content.slice(defaultPrefix.length).split(/ +/);
    const commandName = await args.shift().toLowerCase().split("-").join("");
    const cmd = await client.commands.get(commandName) || client.commands.find(c => c.help.aliases.includes(commandName));

    if (args[0] == undefined || !args.length) return;
    const embed = new MessageEmbed()
        .setAuthor("Noct")
        .setDescription(`${args.join(" ")}`)
        .addField("User ID:", `${user.id}`)
        .setThumbnail(client.user.avatarURL())
        .setFooter(user.tag, user.avatarURL());

    if (cmd.help.name == 'suggest') {
        user.send({
            embeds: [{
                description: `${check_mark}You're suggestion has been saved!`
            }]
        });
        await embed.setTitle('Suggestion')
        await suggestChannel.send({embeds: [embed]});
    }

    if (cmd.help.name == 'report') {
        user.send({
            embeds: [{
                description: `${check_mark}You're report has been saved!`
            }]
        });
        await embed.setTitle('Report')
        await reportChannel.send({embeds: [embed]});
    };
    if (cmd.help.onlyInServer) return;
    else cmd.run(client, message, args, { general: { prefix: '~' }}, {}, strings)
};