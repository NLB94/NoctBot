const {
    MessageEmbed
} = require("discord.js");
const func = require("../../../util/functions");

module.exports = func.run = async (client, message, args) => {
    const guild = await client.guilds.resolve('727494941911154688')
    const suggestChannel = await guild.channels.resolve('824287705504153610');
    const reportChannel = await guild.channels.resolve('797799949047562260');

    if (message.author.bot) return;
    const warning = client.emojis.resolve('806438435933913178');
    const check_mark = client.emojis.resolve('770980790242377739')
    const user = message.author;

    args = await message.content.slice(defaultPrefix.length).split(/ +/);
    const commandName = await args.shift().toLowerCase().split("-").join("");

    const embed = new MessageEmbed()
        .setAuthor("I2Z7")
        .setDescription(`${message.content}`)
        .addField("User ID:", `${user.id}`)
        .setThumbnail(client.user.avatarURL())
        .setFooter(user.tag, user.avatarURL());

    if (commandName == 'suggest') {
        user.send({
            embed: {
                description: `${check_mark}You're suggestion has been saved!`
            }
        });
        await embed.setTitle('Suggestion')
        await suggestChannel.send(embed);
    }

    if (commandName == 'report') {
        user.send({
            embed: {
                description: `${check_mark}You're report has been saved!`
            }
        });
        await embed.setTitle('Report')
        await reportChannel.send(embed);
    };
};