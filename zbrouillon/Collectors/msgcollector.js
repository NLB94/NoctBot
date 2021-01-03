 

module.exports.run = (client, message, args) => {
    const filter = msg => msg.content.includes(args[0]);
    
    message.channel.send(`Type ${args[0]} for start command`).then(() => {
        message.channel.awaitMessages(filter, { time: 10000 }).then(collected => {message.channel.send(`${collected.size} messages collected!`); });

});
};


module.exports.help = MESSAGES.COMMANDS.COLLECTORS.MSGCOLLECTOR;