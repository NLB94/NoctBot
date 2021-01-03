const { MessageEmbed } = require("discord.js");

module.exports = async (client, member) => {
    const settings = await client.getGuild(member.guild);
    if (settings.guildID == undefined) return;
    const wL = settings.welcomeAndLeave;
    let msg = wL.wMessage;

    if (!wL.wEnable) return;
    if (wL.wEnable && msg == undefined) return;

    else if (wL.wEnable && msg !== undefined) {

        if (msg.includes("{user}")) msg = msg.replace("{user}", member)
        if (msg.includes("{server}")) msg = msg.replace("{server}", member.guild)
        if (msg.includes("{userID}")) msg = msg.replace("{userID}", member.id)
        if (msg.includes("{serverID}")) msg = msg.replace("{serverID}", member.guild.id)
        if (msg.includes("{memberCount}")) msg = msg.replace("{memberCount}", member.guild.memberCount)

        const embed = new MessageEmbed()
            .setAuthor("New Member!")
            .setThumbnail(member.user.displayAvatarURL())
            .setColor("#000000")
            .setDescription(`${msg}`)
            .setTimestamp();

        client.channels.cache.get('789919985307746304').send(embed);

        await client.createUser(member.guild, member);
    }
};