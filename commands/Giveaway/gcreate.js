const { MESSAGES } = require("../../util/constants");
const ms = require("ms");
const { GiveawaysManager } = require("discord-giveaways");
const { MessageAttachment } = require("discord.js");
const Captcha = require("@haileybot/captcha-generator");

module.exports.run = (client, message, args) => {
        let captcha = new Captcha();
        message.channel.send(
            "**Enter the text shown in the image below:**",
            new MessageAttachment(captcha.JPEGStream, "captcha.jpeg")
        );
        let collector = message.channel.createMessageCollector(m => m.author.id === message.author.id);
        collector.on("collect", m => {
            if (m.content.toUpperCase() === captcha.value) message.channel.send("Verified Successfully!");
            else message.channel.send("Failed Verification!");
            collector.stop();
        });
    // try {message.delete();
    // const manager = new GiveawaysManager(client, {
    //     storage: './giveaways.json',
    //     updateCountdownEvery: 5000,
    //     hasGuildMembersIntent: false,
    //     default: {
    //         botsCanWin: false,
    //         exemptPermissions: ['MANAGE_MESSAGES', 'ADMINISTRATOR'],
    //         embedColor: '#FF0000',
    //         reaction: '🎉'
    //     }
    // });

    // client.giveawaysManager = manager;

    // client.giveawaysManager.start(message.channel, {
    //     time: ms(args[0]),
    //     prize: args.slice(2).join(' '),
    //     winnerCount: parseInt(args[1])
    // })}
    // catch (e) {
    //     console.log(e);
    // }
};



module.exports.help = MESSAGES.COMMANDS.GIVEAWAY.GCREATE;