const { MESSAGES } = require("../../../util/constants");
const functions = require('../../../util/functions');

module.exports.run = functions.run = async (client, message, args) => {
    const messages = await message.channel.messages.fetch({ before: message.id })
    const msg = args[0].startsWith('^') ? await message.channel.messages.resolve(messages.size > 0 ? messages.array()[0].id : '\u200b') : await message.channel.messages.resolve(args[0]);
    if (msg == undefined || !msg) return message.channel.send('Invalid Message ID !');

    const reaction = args[1] ? (isNaN(args[1]) ? client.emojis.cache.find(e => e.name.toLowerCase().startsWith(args[1].toLowerCase())) : client.emojis.resolve(args[1])) : null;
    if (reaction == undefined || !reaction) return message.channel.send('Invalid Reaction ID !')
    await msg.react(reaction.id);
};



module.exports.help = MESSAGES.COMMANDS.OTHER.REACT;