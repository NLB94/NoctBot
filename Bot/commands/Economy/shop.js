const {
  MessageEmbed
} = require('discord.js');
const {
  MESSAGES
} = require('../../../util/constants');

const functions = require('../../../util/functions');

module.exports.run = functions.run = async (client, message, args, settings, userInfo, strings) => {
  
  let shop = settings.economy.shop;
  const qNb = args[0] == undefined ? 1 : (parseInt(args[0]) < 1 ? 1 : parseInt(args[0]));

  const embed = new MessageEmbed()
    .setAuthor(message.guild.name, message.guild.iconURL())
    .setTitle('Bot Shop')
    .setFooter('Soon...');


    const pageNbs = parseInt(((shop.length % 100) - (shop.length % 10)).toString().slice(0, 1)) + 1;
    if (isNaN(qNb) || qNb > pageNbs) return message.channel.send({ embeds: [{ description: "Incorrect page number ! Please give a number between 1 and " + pageNbs}]});
    
    shop = await shop.slice((qNb - 1) * 10, ((qNb - 1) * 10) + 10)

    if (!(shop.length > -1)) embed.setDescription(`There are no items in shop... Type \`${settings.general.prefix}create-item\` to create one.`), embed.setFooter('Page 1/1');
    else {
      embed.setDescription(`To purchase an item, type \`${settings.general.prefix}buy-item <item_id> (amount)\` \nList of all items :`), embed.setFooter(`Page ${qNb}/${pageNbs}`)
      shop.forEach(s => {
        embed.addField(`${s.name} - ${s.id}`, `Price : **$${s.price}** \nDescription : **${s.description}**`)
      })
    };

    message.channel.send({embeds: [embed]});
};


module.exports.underCat = MESSAGES.COMMANDS.ECONOMY.ITEMS;

module.exports.help = MESSAGES.COMMANDS.ECONOMY.ITEMS.SHOP;
  // try {
    //   message.channel.send(`Do you want to buy \`${item.name.toLowerCase()}\` for $${item.prix} ? (yes or cancel)`);
    //   const filter = m => (message.author.id === m.author.id);
    //   const userE = await message.channel.awaitMessages(filter, {
    //     max: 1,
    //     time: 20000,
    //     errors: ['time']
    //   });

    //   if (userE.first().content.toLowerCase() === 'yes') {

    //     if (userInfo.moneyCash > item.prix) {
    //       const newB = userInfo.moneyCash - item.prix;
    //       client.updateGuildUI(message.guild, message.member, {
    //         "users.$.moneyCash": newB
    //       });
    //       message.channel.send(`✅You have bought 1 ${item.name.toLowerCase()} for $${item.prix}! \nYou can use this item with ${settings.general.prefix}use <item_name>!`)

    //       userInv.push(item.objet);
    //     }
    //     client.updateGuildUI(message.guild, message.member, {
    //       "users.$.invetory": userInv
    //     });
    //   } else if (userInfo.moneyBank > item.prix) {
    //     const newB = userInfo.moneyBank - item.prix;
    //     client.updateGuildUI(message.guild, message.member, {
    //       "users.$.moneyBank": newB
    //     });
    //     client.updateGuildUI(message.guild, message.member, {
    //       "users.$.invetory": userInv
    //     });
    //     message.channel.send(`✅You have bought 1 ${item.name.toLowerCase()} for $${item.prix}! \nYou can use this item with ${settings.general.prefix}use <item_name>!`)
    //   } else return message.reply(`You don't have enough money to purchase this item! \n\`You need ${Math.floor(item.prix - userInfo.moneyCash)} on your hand or \`${Math.floor(item.prix - userInfo.moneyBank)} in your bank!\``)
    // } catch (e) {
    //   message.channel.send("Canceled command!")
    // }