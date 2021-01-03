// get all bot servers invite : 
var serverArray = client.guilds.cache.array();
for(i = 0; i < serverArray.length; i++) {

    serverArray[i].fetchInvites().then(invites => {
        invites.map(invite => {
           message.channel.send("Invite link: " + invite.url);
        });
    });

}


// prune && clear 
    const settings = await client.getGuild(message.guild);
    if (!args[1] || args[1]  && !args[1].startsWith('<@') && !args[1].endsWith('>')) {
    if (isNaN(args[0])) return message.channel.send(`Correct usage : \`${settings.general.prefix}clear <nb>\``);
    
if (!isNaN(args[0]) && args[0] > 1000) return message.channel.send('Maximum : 1000');
else {
    if (!isNaN(args[0]) && args[0] > 1 || !isNaN(args[0]) && args[0] < 101) {
    const messages = await message.channel.messages.fetch({
        limit: Math.min(args[0]),
        before: message.id,
    });
        message.delete();
        
        const embed = new MessageEmbed()
                .setAuthor(message.author.username, message.author.avatarURL())
                .setColor("#ef0f0f")
            .setDescription(`Deleting messages...`);
                    
                const embed1 = new MessageEmbed()
            .setAuthor(message.author.username, message.author.avatarURL())
            .setColor("#ef0f0f")
            .setDescription(`Successfully cleared ${args[0]} messages in ${message.channel}!`);
                    
             message.channel.send(embed).then(async msg => {
                 await message.channel.bulkDelete(messages);
        await msg.edit([''], embed1).then(msg.delete({ timeout: 10000 }));
                });
 

    
        }
    else if (!isNaN(args[0]) && args[0] > 100 || !isNaN(args[0]) && args[0] < 201) {
        const nb = Math.floor(args[0] - 100);
            const m1 = await message.channel.messages.fetch({
                limit: Math.min(nb),
                before: message.id,
            });
            const m2 = await message.channel.messages.fetch({
                limit: Math.min(100),
                before: message.id,
            });
                message.delete();
            
            const embed = new MessageEmbed()
                    .setAuthor(message.author.username, message.author.avatarURL())
                    .setColor("#ef0f0f")
                    .setDescription(`Deleting messages...`);
                    
                    const embed1 = new MessageEmbed()
                    .setAuthor(message.author.username, message.author.avatarURL())
                    .setColor("#ef0f0f")
                    .setDescription(`Successfully cleared ${args[0]} messages in ${message.channel}!`);
                    
                        message.channel.send(embed).then(async msg => {
                            await message.channel.bulkDelete(m2);
                            await message.channel.bulkDelete(m1);
                            await msg.edit([''], embed1).then(msg.delete({ timeout: 10000 }));
                });
                }
                else if (!isNaN(args[0]) && args[0] > 200 || !isNaN(args[0]) && args[0] < 301) {
                    const nb = Math.floor(args[0] - 200);
                    const m1 = await message.channel.messages.fetch({
                        limit: Math.min(nb),
                        before: message.id,
                    });
                    const m2 = await message.channel.messages.fetch({
                        limit: Math.min(100),
                        before: message.id,
                    });
                    const m3 = await message.channel.messages.fetch({
                        limit: Math.min(100),
                        before: message.id,
                    });
                        message.delete();
                    
                    const embed = new MessageEmbed()
                    .setAuthor(message.author.username, message.author.avatarURL())
                    .setColor("#ef0f0f")
                    .setDescription(`Deleting messages...`);
                    
                    const embed1 = new MessageEmbed()
                    .setAuthor(message.author.username, message.author.avatarURL())
                    .setColor("#ef0f0f")
                    .setDescription(`Successfully cleared ${args[0]} messages in ${message.channel}!`);
                    
                        message.channel.send(embed).then(async msg => {
                            await message.channel.bulkDelete(m2);
                    await message.channel.bulkDelete(m3);
                    await message.channel.bulkDelete(m1);
                            await msg.edit([''], embed1).then(msg.delete({ timeout: 600000 }));
                });
            }
                else if (!isNaN(args[0]) && args[0] > 300 || !isNaN(args[0]) && args[0] < 401) {
                    const nb = Math.floor(args[0] - 300);
                    const m1 = await message.channel.messages.fetch({
                        limit: Math.min(nb),
                        before: message.id,
                    });
                    const m2 = await message.channel.messages.fetch({
                        limit: Math.min(100),
                        before: message.id,
                    });
                    const m3 = await message.channel.messages.fetch({
                        limit: Math.min(100),
                        before: message.id,
                    });
                    const m4 = await message.channel.messages.fetch({
                        limit: Math.min(100),
                        before: message.id,
                    });
                        message.delete();
                    const embed = new MessageEmbed()
                    .setAuthor(message.author.username, message.author.avatarURL())
                    .setColor("#ef0f0f")
                    .setDescription(`Deleting messages...`);
                    
                    const embed1 = new MessageEmbed()
                    .setAuthor(message.author.username, message.author.avatarURL())
                    .setColor("#ef0f0f")
                    .setDescription(`Successfully cleared ${args[0]} messages in ${message.channel}!`);
                    
                        message.channel.send(embed).then(async msg => {
                            await message.channel.bulkDelete(m2);
                    await message.channel.bulkDelete(m3);
                    await message.channel.bulkDelete(m4);
                    await message.channel.bulkDelete(m1);
                            await msg.edit([''], embed1).then(msg.delete({ timeout: 600000 }))
                        });
                }
                else if (!isNaN(args[0]) && args[0] > 400 || !isNaN(args[0]) && args[0] < 501) {
                    const nb = Math.floor(args[0] - 400);
                    const m1 = await message.channel.messages.fetch({
                        limit: Math.min(nb),
                        before: message.id,
                    });
                    const m2 = await message.channel.messages.fetch({
                        limit: Math.min(100),
                        before: message.id,
                    });
                    const m3 = await message.channel.messages.fetch({
                        limit: Math.min(100),
                        before: message.id,
                    });
                    const m4 = await message.channel.messages.fetch({
                        limit: Math.min(100),
                        before: message.id,
                    });
                    const m5 = await message.channel.messages.fetch({
                        limit: Math.min(100),
                        before: message.id,
                    });
                        message.delete();
                    
                    const embed = new MessageEmbed()
                    .setAuthor(message.author.username, message.author.avatarURL())
                    .setColor("#ef0f0f")
                    .setDescription(`Deleting messages...`);
                    
                    const embed1 = new MessageEmbed()
                    .setAuthor(message.author.username, message.author.avatarURL())
                    .setColor("#ef0f0f")
                    .setDescription(`Successfully cleared ${args[0]} messages in ${message.channel}!`);
                    
                        message.channel.send(embed).then(async msg => {
                            await message.channel.bulkDelete(m2);
                    await message.channel.bulkDelete(m3);
                    await message.channel.bulkDelete(m4);
                    await message.channel.bulkDelete(m5);
                    await message.channel.bulkDelete(m1);
                    await msg.edit([''], embed1).then(msg.delete({ timeout: 600000 }))
                        });
                }
                else if (!isNaN(args[0]) && args[0] > 500 || !isNaN(args[0]) && args[0] < 601) {
                    const nb = Math.floor(args[0] - 500);
                    const m1 = await message.channel.messages.fetch({
                        limit: Math.min(nb),
                        before: message.id,
                    });
                    const m2 = await message.channel.messages.fetch({
                        limit: Math.min(100),
                        before: message.id,
                    });
                    const m3 = await message.channel.messages.fetch({
                        limit: Math.min(100),
                        before: message.id,
                    });
                    const m4 = await message.channel.messages.fetch({
                        limit: Math.min(100),
                        before: message.id,
                    });
                    const m5 = await message.channel.messages.fetch({
                        limit: Math.min(100),
                        before: message.id,
                    });
                    const m6 = await message.channel.messages.fetch({
                        limit: Math.min(100),
                        before: message.id,
                    });
                        message.delete();
                    
                    const embed = new MessageEmbed()
                    .setAuthor(message.author.username, message.author.avatarURL())
                    .setColor("#ef0f0f")
                    .setDescription(`Deleting messages...`);
                    
                    const embed1 = new MessageEmbed()
                    .setAuthor(message.author.username, message.author.avatarURL())
                    .setColor("#ef0f0f")
                    .setDescription(`Successfully cleared ${args[0]} messages in ${message.channel}!`);
                    
                        message.channel.send(embed).then(async msg => {
                            await message.channel.bulkDelete(m2);
                    await message.channel.bulkDelete(m3);
                    await message.channel.bulkDelete(m4);
                    await message.channel.bulkDelete(m5);
                    await message.channel.bulkDelete(m1);
                    await message.channel.bulkDelete(m6);
                    await msg.edit([''], embed1).then(msg.delete({ timeout: 600000 }))
                        });
                }
                else if (!isNaN(args[0]) && args[0] > 600 || !isNaN(args[0]) && args[0] < 701) {
                    const nb = Math.floor(args[0] - 600);
                    const m1 = await message.channel.messages.fetch({
                        limit: Math.min(nb),
                        before: message.id,
                    });
                    const m2 = await message.channel.messages.fetch({
                        limit: Math.min(100),
                        before: message.id,
                    });
                    const m3 = await message.channel.messages.fetch({
                        limit: Math.min(100),
                        before: message.id,
                    });
                    const m4 = await message.channel.messages.fetch({
                        limit: Math.min(100),
                        before: message.id,
                    });
                    const m5 = await message.channel.messages.fetch({
                        limit: Math.min(100),
                        before: message.id,
                    });
                    const m6 = await message.channel.messages.fetch({
                        limit: Math.min(100),
                        before: message.id,
                    });
                    const m7 = await message.channel.messages.fetch({
                        limit: Math.min(100),
                        before: message.id,
                    });
                        message.delete();
                    
                    const embed = new MessageEmbed()
                    .setAuthor(message.author.username, message.author.avatarURL())
                    .setColor("#ef0f0f")
                    .setDescription(`Deleting messages...`);
                    
                    const embed1 = new MessageEmbed()
                    .setAuthor(message.author.username, message.author.avatarURL())
                    .setColor("#ef0f0f")
                    .setDescription(`Successfully cleared ${args[0]} messages in ${message.channel}!`);
                    
                        message.channel.send(embed).then(async msg => {
                            await message.channel.bulkDelete(m2);
                    await message.channel.bulkDelete(m3);
                    await message.channel.bulkDelete(m4);
                    await message.channel.bulkDelete(m5);
                    await message.channel.bulkDelete(m6);
                    await message.channel.bulkDelete(m7);
                    await message.channel.bulkDelete(m1);
                    await msg.edit([''], embed1).then(msg.delete({ timeout: 600000 }))
                        });
                }
                else if (!isNaN(args[0]) && args[0] > 700 || !isNaN(args[0]) && args[0] < 801) {
                    const nb = Math.floor(args[0] - 700);
                    const m1 = await message.channel.messages.fetch({
                        limit: Math.min(nb),
                        before: message.id,
                    });
                    const m2 = await message.channel.messages.fetch({
                        limit: Math.min(100),
                        before: message.id,
                    });
                    const m3 = await message.channel.messages.fetch({
                        limit: Math.min(100),
                        before: message.id,
                    });
                    const m4 = await message.channel.messages.fetch({
                        limit: Math.min(100),
                        before: message.id,
                    });
                    const m5 = await message.channel.messages.fetch({
                        limit: Math.min(100),
                        before: message.id,
                    });
                    const m6 = await message.channel.messages.fetch({
                        limit: Math.min(100),
                        before: message.id,
                    });
                    const m7 = await message.channel.messages.fetch({
                        limit: Math.min(100),
                        before: message.id,
                    });
                    const m8 = await message.channel.messages.fetch({
                        limit: Math.min(100),
                        before: message.id,
                    });
                        message.delete();
                    
                    const embed = new MessageEmbed()
                    .setAuthor(message.author.username, message.author.avatarURL())
                    .setColor("#ef0f0f")
                    .setDescription(`Deleting messages...`);
                    
                    const embed1 = new MessageEmbed()
                    .setAuthor(message.author.username, message.author.avatarURL())
                    .setColor("#ef0f0f")
                    .setDescription(`Successfully cleared ${args[0]} messages in ${message.channel}!`);
                    
                        message.channel.send(embed).then(async msg => {
                            await message.channel.bulkDelete(m2);
                    await message.channel.bulkDelete(m3);
                    await message.channel.bulkDelete(m4);
                    await message.channel.bulkDelete(m5);
                    await message.channel.bulkDelete(m6);
                    await message.channel.bulkDelete(m7);
                    await message.channel.bulkDelete(m8);
                    await message.channel.bulkDelete(m1);
                    await msg.edit([''], embed1).then(msg.delete({ timeout: 600000 }))
                        });
                }
                else if (!isNaN(args[0]) && args[0] > 800 || !isNaN(args[0]) && args[0] < 901) {
                    const nb = Math.floor(args[0] - 800);
                    const m1 = await message.channel.messages.fetch({
                        limit: Math.min(nb),
                        before: message.id,
                    });
                    const m2 = await message.channel.messages.fetch({
                        limit: Math.min(100),
                        before: message.id,
                    });
                    const m3 = await message.channel.messages.fetch({
                        limit: Math.min(100),
                        before: message.id,
                    });
                    const m4 = await message.channel.messages.fetch({
                        limit: Math.min(100),
                        before: message.id,
                    });
                    const m5 = await message.channel.messages.fetch({
                        limit: Math.min(100),
                        before: message.id,
                    });
                    const m6 = await message.channel.messages.fetch({
                        limit: Math.min(100),
                        before: message.id,
                    });
                    const m7 = await message.channel.messages.fetch({
                        limit: Math.min(100),
                        before: message.id,
                    });
                    const m8 = await message.channel.messages.fetch({
                        limit: Math.min(100),
                        before: message.id,
                    });
                    const m9 = await message.channel.messages.fetch({
                        limit: Math.min(100),
                        before: message.id,
                    });
                        message.delete();
                    
                    const embed = new MessageEmbed()
                    .setAuthor(message.author.username, message.author.avatarURL())
                    .setColor("#ef0f0f")
                    .setDescription(`Deleting messages...`);
                    
                    const embed1 = new MessageEmbed()
                    .setAuthor(message.author.username, message.author.avatarURL())
                    .setColor("#ef0f0f")
                    .setDescription(`Successfully cleared ${args[0]} messages in ${message.channel}!`);
                    
                        message.channel.send(embed).then(async msg => {
                            await message.channel.bulkDelete(m2);
                    await message.channel.bulkDelete(m3)
                    await message.channel.bulkDelete(m4);
                    await message.channel.bulkDelete(m5);
                    await message.channel.bulkDelete(m6);
                    await message.channel.bulkDelete(m7);
                    await message.channel.bulkDelete(m8);
                    await message.channel.bulkDelete(m9);
                    await message.channel.bulkDelete(m1);
                    await msg.edit([''], embed1).then(msg.delete({ timeout: 600000 }))
                        });
                }
                else if (!isNaN(args[0]) && args[0] > 900 || !isNaN(args[0]) && args[0] < 1001) {
                    const nb = Math.floor(args[0] - 900);
                    const m1 = await message.channel.messages.fetch({
                        limit: Math.min(nb),
                        before: message.id,
                    });
                    const m2 = await message.channel.messages.fetch({
                        limit: Math.min(100),
                        before: message.id,
                    });
                    const m3 = await message.channel.messages.fetch({
                        limit: Math.min(100),
                        before: message.id,
                    });
                    const m4 = await message.channel.messages.fetch({
                        limit: Math.min(100),
                        before: message.id,
                    });
                    const m5 = await message.channel.messages.fetch({
                        limit: Math.min(100),
                        before: message.id,
                    });
                    const m6 = await message.channel.messages.fetch({
                        limit: Math.min(100),
                        before: message.id,
                    });
                    const m7 = await message.channel.messages.fetch({
                        limit: Math.min(100),
                        before: message.id,
                    });
                    const m8 = await message.channel.messages.fetch({
                        limit: Math.min(100),
                        before: message.id,
                    });
                    const m9 = await message.channel.messages.fetch({
                        limit: Math.min(100),
                        before: message.id,
                    });
                    const m10 = await message.channel.messages.fetch({
                        limit: Math.min(100),
                        before: message.id,
                    });
                        message.delete();
                    
                    const embed = new MessageEmbed()
                    .setAuthor(message.author.username, message.author.avatarURL())
                    .setColor("#ef0f0f")
                    .setDescription(`Deleting messages...`);
                    
                    const embed1 = new MessageEmbed()
                    .setAuthor(message.author.username, message.author.avatarURL())
                    .setColor("#ef0f0f")
                    .setDescription(`Successfully cleared ${args[0]} messages in ${message.channel}!`);
                    
                        message.channel.send(embed).then(async msg => {
                            await message.channel.bulkDelete(m2);
                    await message.channel.bulkDelete(m3);
                    await message.channel.bulkDelete(m4);
                    await message.channel.bulkDelete(m5);
                    await message.channel.bulkDelete(m6);
                    await message.channel.bulkDelete(m7);
                    await message.channel.bulkDelete(m8);
                    await message.channel.bulkDelete(m9);
                    await message.channel.bulkDelete(m10);
                    await message.channel.bulkDelete(m1);
                    await msg.edit([''], embed1).then(msg.delete({ timeout: 600000 }))
                        });
                };
                    
    }}










    //prune command
    else if (args[1] && args[1].startsWith('<@') && args[1].endsWith('>')) {
        
    if (!args[1]) return; 
    else if (!args[1].startsWith('<@') && !args[1].endsWith('>')) return message.channel.send(`Correct usage : \`${client.config.prefix}clear <nb> @user\``);
    else if (isNaN(args[0])) return message.channel.send(`Correct usage : \`${client.config.prefix}clear <nb> @user\``);
    else if (args[0] < 1 || args[0] > 101) return message.channel.send("Minimum : 2\nMaximum : 100")
    
    let user = message.guild.member(message.mentions.users.first());
    if (!user) return message.channel.send("This user doesn't exists!");

    if (!isNaN(args[0]) && args[1].startsWith('<@') && args[1].endsWith('>') && args[0] > 1 || args[0] < 101) {
        let user = message.guild.member(message.mentions.users.first());
        const messages = (await message.channel.messages.fetch({
             limit: 100,
             before: message.id,
    })).filter(a => a.author.id === user.id).array();
 
    messages.length = Math.min(args[0], messages.length)

    message.delete();
    await message.channel.bulkDelete(messages)
    .catch(err => {
        message.channel.send("Because of Discord limitations, I can't delete messages pasted 2 weeks!")
    });
    
    const embed = new MessageEmbed()
    .setAuthor(message.author.username, message.author.avatarURL())
    .setColor("#ef0f0f")
    .setDescription(`Successfully deleted ${args[0]} messages of ${user} in ${message.channel}!`);

        message.channel.send(embed);
      };
  };