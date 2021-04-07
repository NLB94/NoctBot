const {
    MessageEmbed
} = require('discord.js');
const {
    MESSAGES
} = require("../../../util/constants");

const functions = require('../../../util/functions');

module.exports.run = functions.run = async (client, message, args, settings, userInfo)  => {

    message.delete().catch(err => {})
    const query = args.join(" ").split("\"")
    let question = ''
    let anwers = []
    const letters = ['🇦', '🇧', '🇨', '🇩', '🇪', '🇫']
    query.splice(0, 1)
    //🇦 🇧 🇨 🇩 🇪 🇫
    for (let i = 0; i < query.length; i++) {
        if (i % 2 !== 0) continue;
        if (i == 0) question = query[i].toString();
        else anwers.push(`${letters[(i/2)-1]}${query[i].toString()}`);
    }
    const embed = new MessageEmbed()
        .setColor("#000000")
        .setDescription(anwers.slice(0, 6).join(`\n`))
        .setFooter(`${message.author.tag}`, message.author.displayAvatarURL());

    message.channel.send(`📊**__${question}__**`, embed).then(async msg => {
        for (let i = 0; i < anwers.slice(0, 6).length; i++) {
            if (anwers[i] == '') continue;
            await msg.react(letters[i])
        }
    }).catch(err => '');
};

module.exports.help = MESSAGES.COMMANDS.OTHER.POLL;