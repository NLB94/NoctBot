const { MessageEmbed } = require('discord.js');
const { MESSAGES } = require('../../util/constants');

module.exports.run = async (client, message, args, userInfo) => {
//   if (!userInfo) {
//     client.createUser(message.member, message.guild);
//   } else if (userInfo.inventory == undefined) {
//     client.createMIOU(message.member, {
//       "users.inventory": {"inventory": []}
//     })
//   };
//   const settings = await client.getGuild(message.guild);
//   const shop = settings.shop;
//   if (!shop) return message.channel.send('There are no items in this shop...');
//   const q = args.join(" ");
//   const pos = shop.map(e => e.name.toLowerCase()).indexOf(q.toLowerCase());
//   const item = shop[pos];
//       const userInv = userInfo.inventory;


//if (q && pos === -1) message.reply("Item not found");
//   const embed = new MessageEmbed()
//   .setAuthor(message.guild.name, message.guild.iconURL())
//   .setTitle('Server Shop')
  
//   if (q && pos !== -1) {
//     try {
//       
//       message.channel.send(`Do you want to buy \`${item.name.toLowerCase()}\` for $${item.prix} ? (yes or cancel)`);
//       const filter = m => (message.author.id === m.author.id);
//       const userE = await message.channel.awaitMessages(filter, {
//         max: 1, time: 20000, errors: ['time']
//       });

//       if (userE.first().content.toLowerCase() === 'yes') {

//         if (userInfo.moneyCash > item.prix) {
  //          const newB = userInfo.moneyCash - item.prix;
//         client.updateUI(message.guild, message.member, {"users.$.moneyCash": newB});
//       message.channel.send(`✅You have bought 1 ${item.name.toLowerCase()} for $${item.prix}! \nYou can use this item with ${settings.general.prefix}use <item_name>!`)

//       userInv.push(item.objet);}
//         client.updateUI(message.guild, message.member, {"users.$.invetory": userInv});
//     else if (userInfo.moneyBank > item.prix) {
  //          const newB = userInfo.moneyBank - item.prix;
//         client.updateUI(message.guild, message.member, {"users.$.moneyBank": newB});
//         client.updateUI(message.guild, message.member, {"users.$.invetory": userInv});
//       message.channel.send(`✅You have bought 1 ${item.name.toLowerCase()} for $${item.prix}! \nYou can use this item with ${settings.general.prefix}use <item_name>!`)
//     }
//   else return message.reply(`You don't have enough money to purchase this item! \n\`You need ${Math.floor(item.prix - userInfo.moneyCash)} on your hand or \`${Math.floor(item.prix - userInfo.moneyBank)} in your bank!\``)}
//     }
//     catch(e) {
//       message.channel.send("Canceled command!")
//     }
    
//   } else {

//   shop.map(s => shop.push(`${s.name} ($${s.prix})`));
//   embed.setDescription(`For purchase an item, type \`${settings.general.prefix}buy-item <item_name> (amount)\` \nList of all items : \n${shop.map(item => `**${item}**`).join('\n')}`);
//   message.channel.send(embed);
// }
};
  
  
  
  module.exports.help = MESSAGES.COMMANDS.ECONOMY.SHOP;