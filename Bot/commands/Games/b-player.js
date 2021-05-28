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
    GuildUserData
} = require('../../../util/functions');
const brawlClient = require('@statscell/brawl').Client;

/**
 * @param {Client} client
 * @param {Message} message 
 * @param {String[]} args 
 * @param {GuildData} settings 
 * @param {GuildUserData} userInfo 
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
            const player = await brawlManager.getBrawlPlayer(tag, 'v1');
            if (!player) return message.channel.send({
                embed: {
                    description: `${x_mark}Player not found !`
                }
            });
            const trophyA = ['SHELLY', 'NITA', 'COLT', 'BULL', 'BROCK', 'DYNAMIKE', '8-BIT' /*Arkad*/ , 'TICK', 'BO', 'JESSIE', 'STU', 'EMZ' /*Eliza*/ ];
            const chromaticA = ['SURGE', 'COLETTE', 'LOU', 'GALE' /*Gaël*/ , 'BELLE', 'COLONEL RUFFS'];
            const epicA = ['BEA', 'FRANK', 'BIBI', 'EDGAR', 'NANI', 'PAM', 'PIPER' /*Polly*/ ];
            const mythicA = ['TARA', 'MORTIS', 'GENE' /*Djinn*/ , 'SPROUT' /*wally*/ , 'BYRON', 'SQUEAK', 'MR. P', 'MAX'];
            const legendaryA = ['SANDY' /*Emery*/ , 'LEON', 'CROW', 'AMBER', 'SPIKE'];
            const sRareA = ['RICO', 'DARRYL', 'PENNY', 'CARL', 'JACKIE'];
            const rareA = ['EL PRIMO', 'POCO', 'ROSA', 'BARLEY' /*bartaba*/ ];

            const trophyB = [];
            const chromaticB = [];
            const epicB = [];
            const mythicB = [];
            const legendaryB = [];
            const sRareB = [];
            const rareB = [];

            player.brawlers.forEach(b => {
                if (trophyA.includes(b.name)) trophyB.push(b);
                else if (chromaticA.includes(b.name)) chromaticB.push(b);
                else if (epicA.includes(b.name)) epicB.push(b);
                else if (mythicA.includes(b.name)) mythicB.push(b);
                else if (legendaryA.includes(b.name)) legendaryB.push(b);
                else if (sRareA.includes(b.name)) sRareB.push(b);
                else if (rareA.includes(b.name)) rareB.push(b);
            })

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
                })
                .setFooter(message.author.tag, message.author.avatarURL());

            embed.addField(`Trophy Road ${trophyB.length}/${trophyNb}`, trophyB.map(t => t), false)

            message.channel.send(embed);
        }
    func(client);
}

module.exports.help = MESSAGES.COMMANDS.BRAWL.PLAYER;