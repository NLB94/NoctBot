 

module.exports.run = (client, message, args) => {
    const filter = reaction => reaction.emoji.name === '🔥';
    message.react('🔥').then(() => {
        message.awaitReactions(filter, { time: 10000}).then(collected => message.channel.send(`${collected.size} reactions collected!`))        
    });
};


module.exports.help = MESSAGES.COMMANDS.COLLECTORS.REACTCOLLECTOR;