const { MESSAGES } = require("../../util/constants");

module.exports.run = (client, message, args) => {
        const channel = message.channel;
        if (channel.type == 'news') return message.channel.send('This channel is the discord update channel, so I can\'t delete.');
        else if (channel.type == 'store') return message.channel.send('Can\'t delete!');
        else if (channel.type == 'text') {
            const position = channel.position;
            const name = channel.name;
            channel.send('Nuking...');

                        channel.clone({name: 'Nuking...'}).then(c => {
                            channel.delete('Nuked this channel');
                            c.send('Successfully nuked this channel!').then(msg => { 
                                setTimeout(() => {
                                    if (message.guild.member(client.user).hasPermission('MANAGE_MESSAGES')) {
                                    msg.delete();
                                }
                                else return;
                                }, 10000);
                            }).catch(err => '');
                        setTimeout(() => {
                            c.edit({name: `${name}`, position: position})
                        }, 3000); 
                    });
                    }
                    else
                        return message.channel.send('Command Canceled!');
                };

module.exports.help = MESSAGES.COMMANDS.MODERATION.NUKE;