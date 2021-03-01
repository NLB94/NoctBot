const {
    Role,
    MessageEmbed
} = require('discord.js');
const {
    MESSAGES
} = require('../../util/constants');

const functions = require('../../util/functions');

module.exports.run = functions.run = async (client, message, args) => {
    const cancelEmbed = new MessageEmbed()
        .setTitle('Create Item')
        .setDescription('Command Canceled')
        .setTimestamp()
        .setAuthor(message.author.tag, message.author.avatarURL());
    try {
        let item = {
            name: String,
            price: Number,
            description: String,
            stock: Number,
            timeInShop: (Number || Date),
            requiredRole: Role,
            roleToGive: Role,
            roleToRemove: Role,
            replyMsg: (String || MessageEmbed)
        }
        const checkMark = client.emojis.resolve('770980790242377739');
        const embed = new MessageEmbed()
            .setTitle('Create Item')
            .setColor('#000000')
            .setTimestamp();

        message.channel.send('What is the name of the item ? (35 characters max) ', embed).then(async msg => {
            const filter = m => {
                if (m.author.bot) return false;
                if (message.author.id == m.author.id) return true;
            }
            const userE = await message.channel.awaitMessages(filter, {
                max: 1,
                time: 20000,
                errors: ['time']
            })
            if (userE.first().toString().toLowerCase() == 'cancel') return message.channel.send(cancelEmbed)
            else item.name = userE.first().toString().slice(0, 35);

            userE.first().delete();

            embed.addField('Name', item.name, true);
            await msg.edit('How much should the item cost to purchase ?', embed)

            const userE2 = await message.channel.awaitMessages(filter, {
                max: 1,
                time: 20000,
                errors: ['time']
            })
            if (userE2.first().toString().toLowerCase() == 'cancel') return message.channel.send(cancelEmbed)
            else item.price = parseInt(userE2.first().toString());

            userE2.first().delete()

            embed.addField('price', item.price, true)
            msg.edit('Please provide a description. (500 characters max).', embed)
            const userE3 = await message.channel.awaitMessages(filter, {
                max: 1,
                time: 20000,
                errors: ['time']
            })
            if (userE3.first().toString().toLowerCase() == 'cancel') return message.channel.send(cancelEmbed);
            else if (userE3.first().toString().toLowerCase() == 'skip') item.description = '\u200b';
            else item.description = userE3.first().toString().slice(0, 500);

            userE3.first().delete()

            embed.setFooter('You can type cancel or skip at any moment')
            embed.addField('Description', item.description, false)
            msg.edit('How much this item is on stock ? (skip = unlimited)', embed)

            const userE4 = await message.channel.awaitMessages(filter, {
                max: 1,
                time: 20000,
                errors: ['time']
            })
            if (userE4.first().toString().toLowerCase() == 'cancel') return message.channel.send(cancelEmbed);
            else if (userE4.first().toString().toLowerCase() == 'skip') item.stock = 'Unlimited';
            else item.stock = parseInt(userE4.first().toString());

            userE4.first().delete()

            embed.addField('Stock', item.stock);
            msg.edit('How long the item have to appear in shop ? (5m min, 2d max) (skip = unlimited)', embed);

            const userE5 = await message.channel.awaitMessages(filter, {
                max: 1,
                time: 20000,
                errors: ['time']
            })
            if (userE5.first().toString().toLowerCase() == 'cancel') return message.channel.send(cancelEmbed);
            else if (userE5.first().toString().toLowerCase() == 'skip') item.timeInShop = 'Unlimited';
            else item.timeInShop = parseInt(userE5.first().toString());

            userE5.first().delete()

            embed.addField('Time in shop', item.timeInShop);
            msg.edit('What role user must already have to buy this item ?', embed);
            
            const userE6 = await message.channel.awaitMessages(filter, {
                max: 1,
                time: 20000,
                errors: ['time']
            })
            if (userE6.first().toString().toLowerCase() == 'cancel') return message.channel.send(cancelEmbed);
            else if (userE6.first().toString().toLowerCase() == 'skip') item.requiredRole = message.guild.id;
            else item.requiredRole = userE6.first().mentions.roles.first();

            userE6.first().delete();

            embed.addField('Required Role', `${item.requiredRole}`, true);
            msg.edit('What role you want to add to an user when he buy this item ? Ping this role.', embed);

            const userE7 = await message.channel.awaitMessages(filter, {
                max: 1,
                time: 20000,
                errors: ['time']
            })
            if (userE7.first().toString().toLowerCase() == 'cancel') return message.channel.send(cancelEmbed);
            else if (userE7.first().toString().toLowerCase() == 'skip') item.roleToGive = '\u200b';
            else item.roleToGive = userE7.first().mentions.roles.first();

            userE7.first().delete();

            embed.addField('Role To Give', `${item.roleToGive}`, true);
            msg.edit('What role you want to remove from an user when he buy this item ? Ping this role.', embed);

            const userE8 = await message.channel.awaitMessages(filter, {
                max: 1,
                time: 20000,
                errors: ['time']
            })
            if (userE8.first().toString().toLowerCase() == 'cancel') return message.channel.send(cancelEmbed);
            else if (userE8.first().toString().toLowerCase() == 'skip') item.roleToRemove = '\u200b';
            else item.roleToRemove = userE8.first().mentions.roles.first();

            userE8.first().delete();

            embed.addField('Role To Remove', `${item.roleToRemove}`, true);
            msg.edit('What message you want bot reply ? (max 2000 characters)', embed);

            const userE9 = await message.channel.awaitMessages(filter, {
                max: 1,
                time: 20000,
                errors: ['time']
            })
            if (userE9.first().toString().toLowerCase() == 'cancel') return message.channel.send(cancelEmbed);
            else if (userE9.first().toString().toLowerCase() == 'skip') item.replyMsg = '\u200b';
            else item.replyMsg = userE9.first().toString().slice(0, 2000);

            userE9.first().delete();

            embed.addField('Reply Message', `${item.replyMsg}`, true);
            
            client.createItem(message.guild, item).then(() => {
                msg.edit(`${checkMark}Successfully created item !`, embed);
            })
        })
    } catch (e) {
        console.log(e)
        message.channel.send(cancelEmbed);
    }
}

module.exports.help = MESSAGES.COMMANDS.ECONOMY.CREATEITEM;