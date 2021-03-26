const {
    MessageEmbed
} = require("discord.js");
const func = require("../../../util/functions");

module.exports = func.run = (client, message) => {
    const channel = client.guilds.resolve('727494941911154688').channels.resolve('824287705504153610');
    if (message.author.bot) return;
    const warning = client.emojis.resolve('806438435933913178');
    const check_mark = client.emojis.resolve('770980790242377739')
    const user = message.author;

    user.send({embed: {description: `${warning}All your messages in this discussion will be send to bot owner as suggestions or report !! \n${check_mark}You're suggestion has been saved!`}});

    const embed = new MessageEmbed()
        .setAuthor("I2Z7")
        .setTitle("**New DM Message**")
        .setDescription(`${message.content}`)
        .addField("User ID:", `${user.id}`)
        .setThumbnail(client.user.avatarURL())
        .setFooter(user.tag, user.avatarURL());

    if (message.author.id !== process.env.OWNER_ID) {
        channel.send(embed);
    };
};