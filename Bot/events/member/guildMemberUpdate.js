const {
    GuildMember,
    PartialGuildMember,
    Client,
    MessageEmbed
} = require("discord.js");
const { getStrings } = require("../../../util/constants");

/**
 * 
 * @param {Client} client
 * @param {GuildMember | PartialGuildMember} oldMember 
 * @param {GuildMember} newMember 
 */
module.exports = async (client, oldMember, newMember) => {
    const settings = await client.getGuild(newMember.guild);
    if (!settings) settings.general.language == 'en';
    const strings = await getStrings(client, settings.general.language);
    if (oldMember.pending) {
        if (!newMember.pending) {
            if (newMember.guild.id !== '727494941911154688') return;
            newMember.roles.add('770658615752261682');
            const channel = await newMember.guild.channels.resolve('769656304402563103')
            const rolesChannels = await newMember.guild.channels.resolve('819871741823156265');
            const commuEmbed = new MessageEmbed()
                .setDescription(`${newMember} just joined the server ! We are now ${(await newMember.guild.members.fetch()).size} members in **${newMember.guild.name}**`)
                .setTimestamp()
                .setThumbnail(newMember.user.displayAvatarURL())
            channel.send(`Hey ${newMember}, **welcome to ${newMember.guild.name}** ! \nDon't forget to **read the rules** <#769656305211539456> and **choose your roles** <#819871741823156265> !`, commuEmbed)
            rolesChannels.send(`${newMember}, choose your roles !`).then(msg => msg.delete({
                timeout: 1000
            })).catch(() => {})
        }
    };
}