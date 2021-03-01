const {
    MESSAGES
} = require('../../util/constants');

module.exports.run = async (client, message, args) => {
    const x_mark = client.emojis.resolve('806440609127596032');
    const check_mark = client.emojis.resolve('770980790242377739')
    switch (args[0].toLowerCase()) {
        case "enable": {
            if (settings.captcha.enable) return message.channel.send({embed: {description: `${x_mark}Captcha system is already enable !`}});
            await client.updateGuild(message.guild, { "captcha.enable": true });
            message.channel.send({embed: {description: `${check_mark}Successfully enabled captcha system !`}});
            break;
        }
        case "disable": {
            if (settings.captcha.disable) return message.channel.send({embed: {description: `${x_mark}Captcha system is not enable !`}});
            await client.updateGuild(message.guild, { "captcha.enable": false });
            message.channel.send({embed: {description: `${check_mark}Successfully disabled captcha system !`}});
            break;
        }
        case "role": {
            const role = message.mentions.roles.first() == undefined ? ("a") : message.mentions.roles.first().id
            break;
        }
        case "channel": {

            break;
        }
        case "logs": {

            break;
        }
    }
}

module.exports.help = MESSAGES.COMMANDS.CAPTCHA.CAPTCHA;