const {
    Role,
    MessageEmbed
} = require('discord.js');
const ms = require('ms');
const {
    MESSAGES
} = require('../../../util/constants');
const {
    Item
} = require('../../../util/economy')
const functions = require('../../../util/functions');

module.exports.run = functions.run = async (client, message, args, settings, userInfo, strings) => {


    const language = settings.general.language;

    const cancelEmbed = new MessageEmbed()
        .setTitle(language == 'fr' ? 'Création de produit' : 'Create Item')
        .setDescription(language == 'fr' ? 'Commande annulée' : 'Command canceled')
        .setTimestamp()
        .setAuthor(message.author.tag, message.author.avatarURL());

    try {
        let item = {
            name: String,
            price: Number,
            description: String,
            id: (settings.economy.shop.length + 1),
            stock: Number,
            timeInShop: (Number || Date),
            requiredRole: String,
            roleToGive: String,
            roleToRemove: String,
            replyMsg: (String || MessageEmbed)
        }
        const checkMark = client.emojis.resolve(client.localEmojis.checkMark);
        const embed = new MessageEmbed()
            .setTitle(language == 'fr' ? 'Création de produit' : 'Create Item')
            .setColor('#000000')
            .setTimestamp();

        message.channel.send(language == 'fr' ? 'Quelle est le nom du produit ? (35 caractères max)' : 'What is the name of the item ? (35 characters max) ', embed).then(async msg => {
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

            embed.addField(language == 'fr' ? 'Nom' : 'Name', item.name, true);
            await msg.edit(language == 'fr' ? 'Combien coûte le produit ? (Par défaut : 1000)' : 'How much should the item cost to purchase ? (Default : 1000)', embed)

            const userE2 = await message.channel.awaitMessages(filter, {
                max: 1,
                time: 20000,
                errors: ['time']
            })
            if (userE2.first().toString().toLowerCase() == 'cancel') return message.channel.send(cancelEmbed)
            else item.price = isNaN(parseInt(userE2.first().toString())) ? 1000 : parseInt(userE2.first().toString());

            userE2.first().delete().catch(() => {})

            embed.addField('Price', item.price, true)
            msg.edit(language == 'fr' ? 'Donnez une description. (500 caractères max)' : 'Please provide a description. (500 characters max)', embed)
            const userE3 = await message.channel.awaitMessages(filter, {
                max: 1,
                time: 150000,
                errors: ['time']
            })
            if (userE3.first().toString().toLowerCase() == 'cancel') return message.channel.send(cancelEmbed);
            else if (userE3.first().toString().toLowerCase() == 'skip') item.description = '\u200b';
            else item.description = userE3.first().toString().slice(0, 500);

            userE3.first().delete().catch(() => {})

            embed.setFooter(language == 'fr' ? 'Vous pouvez taper cancel ou skip à n\'importe quelle moment' : 'You can type cancel or skip at any moment')
            embed.addField('Description', item.description, false)
            msg.edit(language == 'fr' ? 'Quelle est le stock de ce produit ? (skip = illimité)' : 'How much this item is on stock ? (skip = unlimited)', embed)

            const userE4 = await message.channel.awaitMessages(filter, {
                max: 1,
                time: 20000,
                errors: ['time']
            })
            if (userE4.first().toString().toLowerCase() == 'cancel') return message.channel.send(cancelEmbed);
            else if (userE4.first().toString().toLowerCase() == 'skip') item.stock = 'Unlimited';
            else item.stock = isNaN(parseInt(userE4.first().toString())) ? 'Unlimited' : parseInt(userE4.first().toString());

            userE4.first().delete().catch(() => {})

            embed.addField('Stock', item.stock);
            // msg.edit(language == 'fr' ? 'Combien de temps le produit doit rester dans le magasin ? (5m min, 2j max) (skip = illimité)' : 'How long the item have to appear in shop ? (5m min, 2d max) (skip = unlimited)', embed);

            // const userE5 = await message.channel.awaitMessages(filter, {
            //     max: 1,
            //     time: 20000,
            //     errors: ['time']
            // })
            // if (userE5.first().toString().toLowerCase() == 'cancel') return message.channel.send(cancelEmbed);
            // else if (userE5.first().toString().toLowerCase() == 'skip') item.timeInShop = 'Unlimited';
            // else item.timeInShop = ((ms(userE5.first().toString()) > 300000 && ms(userE5.first().toString()) < 1, 728e+8) ? 'Unlimited' : userE5.first().toString());

            // userE5.first().delete().catch(() => {})

            // embed.addField(language == 'fr' ? 'Temps dans le magasin' : 'Time in shop', item.timeInShop);
            msg.edit(language == 'fr' ? 'Quelle role doit avoir l\'utilisateur pour acheter ce produit ? Mentionnez-le.' : 'What role user must already have to buy this item ?', embed);

            const userE6 = await message.channel.awaitMessages(filter, {
                max: 1,
                time: 20000,
                errors: ['time']
            })
            if (userE6.first().toString().toLowerCase() == 'cancel') return message.channel.send(cancelEmbed);
            else if (userE6.first().toString().toLowerCase() == 'skip') item.requiredRole = message.guild.id;
            else item.requiredRole = userE6.first().mentions.roles.first() ? userE6.first().mentions.roles.first().id : message.guild.id;

            userE6.first().delete().catch(err => {})

            embed.addField(language == 'fr' ? 'Role Requis' : 'Required Role', `<@&${item.requiredRole}>`, true);
            msg.edit(language == 'fr' ? 'Quelle role voulez-vous ajouter à l\'utilisateur lorsqu\'il achète ce produit ? Mentionnez-le.' : 'What role you want to add to an user when he buy this item ? Ping this role.', embed);

            const userE7 = await message.channel.awaitMessages(filter, {
                max: 1,
                time: 20000,
                errors: ['time']
            })
            if (userE7.first().toString().toLowerCase() == 'cancel') return message.channel.send(cancelEmbed);
            else if (userE7.first().toString().toLowerCase() == 'skip') item.roleToGive = message.guild.id;
            else item.roleToGive = userE7.first().mentions.roles.first() ? userE7.first().mentions.roles.first().id : message.guild.id;

            userE7.first().delete().catch(err => {})

            embed.addField('Role to give', `<@&${item.roleToGive}>`, true);
            msg.edit(language == 'fr' ? 'Quelle role voulez-vous retirer à l\'utilisateur lorsqu\'il achète ce produit ? Mentionnez-le.' : 'What role you want to remove from an user when he buy this item ? Ping this role.', embed);

            const userE8 = await message.channel.awaitMessages(filter, {
                max: 1,
                time: 20000,
                errors: ['time']
            })
            if (userE8.first().toString().toLowerCase() == 'cancel') return message.channel.send(cancelEmbed);
            else if (userE8.first().toString().toLowerCase() == 'skip') item.roleToRemove = message.guild.id;
            else item.roleToRemove = userE8.first().mentions.roles.first() ? userE8.first().mentions.roles.first().id : message.guild.id;

            userE8.first().delete().catch(err => {})

            embed.addField(language == 'fr' ? 'Role à retirer' : 'Role to remove', `<@&${item.roleToRemove}>`, true);
            msg.edit(language == 'fr' ? 'Quelle message voulez-vous que le bot envoie une fois l\'achat terminé ? (max 1500 caractères)' : 'What message you want bot reply ? (max 2000 characters)', embed);

            const userE9 = await message.channel.awaitMessages(filter, {
                max: 1,
                time: 300000,
                errors: ['time']
            })
            if (userE9.first().toString().toLowerCase() == 'cancel') return message.channel.send(cancelEmbed);
            else if (userE9.first().toString().toLowerCase() == 'skip') item.replyMsg = '\u200b';
            else item.replyMsg = userE9.first().toString().slice(0, 1500);

            userE9.first().delete().catch(err => {})

            embed.addField(language == 'fr' ? 'Réponse' : 'Reply Message', `${item.replyMsg}`, true);

            client.createItem(message.guild, item).then(() => {
                msg.edit(`${checkMark}${language == 'fr' ? 'Produit crée avec succès !' : 'Successfully created item !'}`, embed);
            })
        })
    } catch (e) {
        console.log(e);
        message.channel.send(cancelEmbed);
    }
}
module.exports.underCat = MESSAGES.COMMANDS.ECONOMY.ADMIN;

module.exports.help = MESSAGES.COMMANDS.ECONOMY.ADMIN.CREATEITEM;