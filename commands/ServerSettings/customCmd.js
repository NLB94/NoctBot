const { MESSAGES } = require("../../util/constants");

module.exports.run = async (client, message, args, settings) => {
    if (settings.customCmdsNb >= 3 && !settings.general.premium) return message.channel.send("You can't create more than 3 custom commands if you don't have I2Z7 Premium! \n\n(I2Z7 Premium will be available soon...)");
    else if (settings.customCmdsNb < 3 || settings.customCmdsNb >= 3 && settings.general.premium) {
        message.channel.send('Do you want to create a custom command ? (yes or cancel)');
        try {
            const filter = f => f.author.id == message.author.id;
            const userE = await message.channel.awaitMessages(filter, {
                max: 1, time: 20000, errors: ['time']
            });
            if (userE.first().toLowerCase().startsWith('y')) {
                message.channel.send('What is the name (trigger) of the command ? (you can cancel)')
                try {
                    const filter = f => f.author.id == message.author.id;
                    const userE = await message.channel.awaitMessages(filter, {
                        max: 1, time: 20000, errors: ['time']
                    });
                    const name = userE.first().toLowerCase();
                    if (userE.first().toLowerCase().startsWith('cancel' || 'no')) return message.channel.send('Command canceled');
                    else {
                        let description = '';
                        message.channel.send(`Alright, trigger will be ${name}! Then, what is the description of the command ? (you can cancel or skip)`);
                        try {
                            const filter = f => f.author.id == message.author.id;
                            const userE = await message.channel.awaitMessages(filter, {
                                max: 1, time: 20000, errors: ['time']
                            });
                            if (userE.first().toLowerCase().startsWith('cancel' || 'no')) return message.channel.send('Command canceled');
                            else if (userE.first().toLowerCase().startsWith('skip')) description = '';
                            else description = userE.first();

                            {
                                let onlyAdmin = false;
                                message.channel.send(`Description is : ${description}. Only admin can use this command ? (cancel, yes or no)`);
                                try {
                                    const filter = f => f.author.id == message.author.id;
                                    const userE = await message.channel.awaitMessages(filter, {
                                        max: 1, time: 20000, errors: ['time']
                                    });
                                    if (userE.first().toLowerCase().startsWith('cancel')) return message.channel.send('Command canceled');
                                    else if (userE.first().toLowerCase().startsWith('n' || 's')) onlyAdmin = false;
                                    else if (userE.first().toLowerCase().startsWith('y')) onlyAdmin = true;
                                    {
                                        let code = 'None';
                                        message.channel.send(`Only Admin can use : ${onlyAdmin}. Ok, now you can write your command's code! (cancel) {**WARNING: YOU HAVE 5 MINUTES! AFTER THIS, COMMAND WILL BE CANCELED**}  \nFor show all availabilities, type ${settings.general.prefix}custom-cmd-help`);
                                        try {
                                            const filter = f => f.author.id == message.author.id;
                                            const userE = await message.channel.awaitMessages(filter, {
                                                max: 1, time: 30000, errors: ['time']
                                            });
                                            if (userE.first().toLowerCase().startsWith('cancel')) return message.channel.send('Command canceled');
                                            else code = userE.first();
                                            client.newCustomCommand(message.guild, name, description, onlyAdmin, code);
                                            message.channel.send(`You're custom command have been saved! \nName: ${name} \nDescription : ${description} \nOnly Admin : ${onlyAdmin} \nCode : ${code}`);
                                        }
                                        catch (e) {
                                            return message.channel.send('Command canceled')
                                        }
                                    }
                                }
                                catch (e) {
                                    return message.channel.send('Command canceled')
                                }
                            }
                        }
                        catch (e) {
                            return message.channel.send('Command canceled')
                        }
                    }
                } catch (e) {
                    return message.channel.send('Command canceled')
                }
            }
            else return message.channel.send('Command canceled');
        }
        catch (e) {
            return message.channel.send('Command canceled')
        }
    }
};



module.exports.help = MESSAGES.COMMANDS.SERVERSETTINGS.CUSTOMCMD;