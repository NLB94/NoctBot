const {
    MessageEmbed,
    Message,
    Client
} = require("discord.js");
const {
    MESSAGES
} = require("../../../util/constants");
const {
    GuildData,
    UserData
} = require('../../../util/functions');
const brawlClient = require('@statscell/brawl').Client;

/**
 * @param {Client} client
 * @param {Message} message 
 * @param {String[]} args 
 * @param {GuildData} settings 
 * @param {UserData} userInfo 
 */
module.exports.run = async (client, message, args, settings, userInfo) => {
    const tag = args[0];
    message.delete();
    const x_mark = client.emojis.resolve(client.localEmojis.x_mark);
    const func =
        /**
         * 
         * @param {brawlClient} brawlManager 
         * @returns
         */
        async (brawlManager) => {
            if (!brawlManager) return;
            const player = await brawlManager.getPlayer(tag, 'v1');
            if (!player) return message.channel.send({
                embed: {
                    description: `${x_mark}Player not found !`
                }
            });
            const embed = new MessageEmbed()
                .setAuthor(`${player.name} • ${player.tag}`)
                .setDescription(`[Vote](https://top.gg/bot/${client.user.id}) • [Add me](https://discord.com/oauth2/authorize?client_id=735824367698837555&permissions=2146958847&response_type=code&scope=identify%20applications.commands%20bot%20guilds%20guilds.join)`)
                .addFields({
                    name: 'Trophies',
                    value: `\`${player.trophies}\``,
                    inline: true
                }, {
                    name: 'Best Trophies',
                    value: `\`${player.highestTrophies}\``,
                    inline: true
                },)
                .setFooter(message.author.tag, message.author.avatarURL())
            
            message.channel.send(embed);
        }
        func(client);
}

module.exports.help = MESSAGES.COMMANDS.BRAWL.PLAYER;