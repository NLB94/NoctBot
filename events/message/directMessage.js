const { MessageEmbed } = require("discord.js");
const { ownerID } = require("../../config");
const message = require("./message");

module.exports = (client, message) => {
    const ownerDM = client.users.cache.get(ownerID);
    if (message.author.bot) return;
    const user = message.author;
    user.send('You\'re suggestion has been saved!');

        const embed = new MessageEmbed()
        .setAuthor("I2Z7")
        .setTitle("**New DM Message**")
        .setDescription(`${message.content}`)
        .addField("User ID:", `${user.id}`)
        .setThumbnail(client.user.avatarURL())
        .setFooter(user.tag, user.avatarURL());

    if (message.author.id !== ownerID) {    
    ownerDM.send(`New DM From ${user.tag}!`);
    ownerDM.send(embed);
    
};
};