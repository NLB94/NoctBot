const {
    MessageEmbed
} = require('discord.js');

module.exports = async (client, oldChannel, newChannel) => {
    if (newChannel.type === "dm") return;
    if (!oldChannel || !newChannel) return;
    else {
        await oldChannel.guild.fetchAuditLogs({
            limit: 1,
            type: 'CHANNEL_UPDATE'
        }).then(async f => {
            const latestChannelUpdated = await f.entries.first();
            const {
                executor
            } = await latestChannelUpdated;

            const logs = message.channel;

            const embed = new MessageEmbed()
                .setAuthor("Channel Updated")
                .setThumbnail(executor.avatarURL())
                .setColor("#000000")
                .setDescription(`Before : ${oldChannel.name} \nAfter : ${newChannel} (${newChannel.name}) \nType : ${newChannel.type} \nBy ${executor.tag} (<@${executor.id}>)`)
                .setTimestamp()
                .setFooter(newChannel.guild.name, newChannel.guild.iconURL());


            logs.send(embed);

        }).catch((err) => {
            const logs = message.channel;

            const embed = new MessageEmbed()
                .setAuthor("Channel Updated")
                .setColor("#000000")
                .setDescription(`Before : ${oldChannel.name} \nAfter : ${newChannel} (${newChannel.name}) \nType : ${newChannel.type}`)
                .setTimestamp()
                .setFooter(newChannel.guild.name, newChannel.guild.iconURL());


            logs.send(embed)
        });


    };
};