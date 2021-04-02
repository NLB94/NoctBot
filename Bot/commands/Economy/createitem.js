const {
    Role,
    MessageEmbed
} = require('discord.js');
const {
    MESSAGES
} = require('../../../util/constants');
const { Item } = require('../../../util/economy')
const functions = require('../../../util/functions');

module.exports.run = functions.run = async (client, message, args, settings)  => {

    
    const language = settings.general.language;

    const cancelEmbed = new MessageEmbed()
        .setTitle(await client.translate('Create Item', 'en', language))
        .setDescription(await client.translate('Command canceled', 'en', language))
        .setTimestamp()
        .setAuthor(message.author.tag, message.author.avatarURL());
    try {
        let item = new Item({
            name: String,
            price: Number,
            description: String,
            stock: Number,
            timeInShop: (Number || Date),
            requiredRole: Role,
            roleToGive: Role,
            roleToRemove: Role,
            replyMsg: (String || MessageEmbed)
        })
        const checkMark = client.emojis.resolve('770980790242377739');
        const embed = new MessageEmbed()
            .setTitle(await client.translate('Create Item', 'en', language))
            .setColor('#000000')
            .setTimestamp();

        message.channel.send(await client.translate('What is the name of the item ? (35 characters max) ', 'en', language), embed).then(async msg => {
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

            userE.first().delete().catch(err => {})

            embed.addField(await client.translate('Name', 'en', language), item.name, true);
            await msg.edit(await client.translate('How much should the item cost to purchase ?', 'en', language), embed)

            const userE2 = await message.channel.awaitMessages(filter, {
                max: 1,
                time: 20000,
                errors: ['time']
            })
            if (userE2.first().toString().toLowerCase() == 'cancel') return message.channel.send(cancelEmbed)
            else item.price = parseInt(userE2.first().toString());

            userE2.first().delete()

            embed.addField('price', item.price, true)
            msg.edit(await client.translate('Please provide a description. (500 characters max).', 'en', language), embed)
            const userE3 = await message.channel.awaitMessages(filter, {
                max: 1,
                time: 20000,
                errors: ['time']
            })
            if (userE3.first().toString().toLowerCase() == 'cancel') return message.channel.send(cancelEmbed);
            else if (userE3.first().toString().toLowerCase() == 'skip') item.description = '\u200b';
            else item.description = userE3.first().toString().slice(0, 500);

            userE3.first().delete()

            embed.setFooter(await client.translate('You can type cancel or skip at any moment', 'en', language))
            embed.addField(await client.translate('Description', 'en', language), item.description, false)
            msg.edit(await client.translate('How much this item is on stock ? (skip = unlimited)', 'en', language), embed)

            const userE4 = await message.channel.awaitMessages(filter, {
                max: 1,
                time: 20000,
                errors: ['time']
            })
            if (userE4.first().toString().toLowerCase() == 'cancel') return message.channel.send(cancelEmbed);
            else if (userE4.first().toString().toLowerCase() == 'skip') item.stock = 'Unlimited';
            else item.stock = parseInt(userE4.first().toString());

            userE4.first().delete()

            embed.addField(await client.translate('Stock', 'en', language), item.stock);
            msg.edit(await client.translate('How long the item have to appear in shop ? (5m min, 2d max) (skip = unlimited)', 'en', language), embed);

            const userE5 = await message.channel.awaitMessages(filter, {
                max: 1,
                time: 20000,
                errors: ['time']
            })
            if (userE5.first().toString().toLowerCase() == 'cancel') return message.channel.send(cancelEmbed);
            else if (userE5.first().toString().toLowerCase() == 'skip') item.timeInShop = 'Unlimited';
            else item.timeInShop = parseInt(userE5.first().toString());

            userE5.first().delete()

            embed.addField(await client.translate('Time in shop', 'en', language), item.timeInShop);
            msg.edit(await client.translate('What role user must already have to buy this item ?', 'en', language), embed);
            
            const userE6 = await message.channel.awaitMessages(filter, {
                max: 1,
                time: 20000,
                errors: ['time']
            })
            if (userE6.first().toString().toLowerCase() == 'cancel') return message.channel.send(cancelEmbed);
            else if (userE6.first().toString().toLowerCase() == 'skip') item.requiredRole = message.guild.id;
            else item.requiredRole = userE6.first().mentions.roles.first();

            userE6.first().delete().catch(err => {})

            embed.addField(await client.translate('Required Role', 'en', language), `${item.requiredRole}`, true);
            msg.edit(client.translate('What role you want to add to an user when he buy this item ? Ping this role.', 'en', language), embed);

            const userE7 = await message.channel.awaitMessages(filter, {
                max: 1,
                time: 20000,
                errors: ['time']
            })
            if (userE7.first().toString().toLowerCase() == 'cancel') return message.channel.send(cancelEmbed);
            else if (userE7.first().toString().toLowerCase() == 'skip') item.roleToGive = '\u200b';
            else item.roleToGive = userE7.first().mentions.roles.first();

            userE7.first().delete().catch(err => {})

            embed.addField(await client.translate('Role to give', 'en', language), `${item.roleToGive}`, true);
            msg.edit(await client.translate('What role you want to remove from an user when he buy this item ? Ping this role.', 'en', language), embed);

            const userE8 = await message.channel.awaitMessages(filter, {
                max: 1,
                time: 20000,
                errors: ['time']
            })
            if (userE8.first().toString().toLowerCase() == 'cancel') return message.channel.send(cancelEmbed);
            else if (userE8.first().toString().toLowerCase() == 'skip') item.roleToRemove = '\u200b';
            else item.roleToRemove = userE8.first().mentions.roles.first();

            userE8.first().delete().catch(err => {})

            embed.addField(await client.translate('Role to remove', 'en', language), `${item.roleToRemove}`, true);
            msg.edit(await client.translate('What message you want bot reply ? (max 2000 characters)', 'en', language), embed);

            const userE9 = await message.channel.awaitMessages(filter, {
                max: 1,
                time: 20000,
                errors: ['time']
            })
            if (userE9.first().toString().toLowerCase() == 'cancel') return message.channel.send(cancelEmbed);
            else if (userE9.first().toString().toLowerCase() == 'skip') item.replyMsg = '\u200b';
            else item.replyMsg = userE9.first().toString().slice(0, 2000);

            userE9.first().delete().catch(err => {})

            embed.addField(await client.translate('Reply Message', 'en', language), `${item.replyMsg}`, true);
            
            client.createItem(message.guild, item).then(() => {
                msg.edit(`${checkMark}${client.translate('Successfully created item !', 'en', language)}`, embed);
            })
        })
    } catch (e) {
        console.log(e)
        message.channel.send(cancelEmbed);
    }
}

module.exports.help = MESSAGES.COMMANDS.ECONOMY.CREATEITEM;