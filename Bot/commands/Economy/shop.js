const {
  MessageEmbed
} = require('discord.js');
const {
  MESSAGES
} = require('../../../util/constants');

const functions = require('../../../util/functions');

module.exports.run = functions.run = async (client, message, args, settings, userInfo) => {
  
  const shop = settings.economy.shop;
  const qNb = args[0] == undefined ? 1 : (parseInt(args[0]) < 1 ? 1 : parseInt(args[0]));

  const embed = new MessageEmbed()
    .setAuthor(message.guild.name, message.guild.iconURL())
    .setTitle('Bot Shop')
    .setFooter('Soon...');

    const shopArray = []
    shop.map(s => shopArray.push(`${s.name} ($${s.price})\n${s.description}`));

    const pageNbs = parseInt(((shopArray.length % 100) - (shopArray.length % 10)).toString().slice(0, 1)) + 1;
    if (isNaN(qNb) || qNb > pageNbs) return message.channel.send({ embed: { description: "Incorrect page number ! Please give a number between 1 and " + pageNbs}});
    
    if (shopArray.length < 1) embed.setDescription(`This is the **bot shop** and there are no items in it... Type \`${settings.general.prefix}create-item\` to create one and \`${settings.general.prefix}server-shop\` to show the server shop.`), embed.setFooter('Page 1/1');
    else embed.setDescription(`For purchase an item, type \`${settings.general.prefix}buy-item <item_name> (amount)\` \nList of all items : \n${shopArray.map(item => `**${item}**`).slice(qNb * 10, (qNb * 10) + 10).join('\n')}`), embed.setFooter(`Page ${qNb}/${pageNbs}`);

    message.channel.send(embed);
};



module.exports.help = MESSAGES.COMMANDS.ECONOMY.SHOP;
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