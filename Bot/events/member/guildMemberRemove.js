const { MessageEmbed } = require("discord.js")

module.exports = async (client, member) => {
    const settings = await client.getGuild(member.guild);
    if (settings == undefined) return;
    let msg = settings.lMessage;

    if (!settings.lEnable) return;
    if (settings.lEnable && msg == undefined) return;

    if (msg.includes("{user}")) msg = msg.replace("{user}", member)
    if (msg.includes("{server}")) msg = msg.replace("{server}", member.guild)
    if (msg.includes("{userID}")) msg = msg.replace("{user}", member.id)
    if (msg.includes("{serverID}")) msg = msg.replace("{serverID}", member.guild.id)
    if (msg.includes("{memberCount}")) msg = msg.replace("{user}", member.guild.members.cache.size)



const embed = new MessageEmbed()
.setAuthor("Member Left!")
.setThumbnail(member.user.displayAvatarURL())
.setColor("#000000")
.setDescription(`${msg}`) 
.setTimestamp();

client.channels.cache.get('789919985307746304').send(embed);
}