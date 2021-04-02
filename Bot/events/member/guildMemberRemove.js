const { MessageEmbed, Client, GuildMember } = require("discord.js")

/**
 * 
 * @param {Client} client 
 * @param {GuildMember} member 
 * @returns 
 */
module.exports = async (client, member) => {
    const settings = await client.getGuild(member.guild);
    if (settings == undefined) await client.createGuild({ guildID: member.guild.id });
    let msg = settings.lMessage;

    if (settings.countChannels.enable) {
        const membersCount = await settings.countChannels.filter(async c => c.category.toLowerCase() == 'members')
        if (!membersCount || !membersCount.length || membersCount == undefined || membersCount.length < 1) return;
        else {
            membersCount.forEach(async m => {
                if (m.type == 'all' || (m.type == 'bots' && member.user.bot) || (m.type == 'humans' && !member.user.bot)) {
                    const channel = await member.guild.channels.resolve(m.id);
                    if (channel) await channel.setName(channel.name.slice(0, (channel.name.length - (member.guild.memberCount - 1).toString().length)) + member.guild.memberCount)
                }
            })

        }
    }

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