const {
  MessageEmbed
} = require('discord.js');
const {
  MESSAGES
} = require('../../util/constants');
const functions = require('../../util/functions');

module.exports.run = functions.run = async (client, message, args, userInfo) => {
  const dailyCd = 8.64e+7;
  const loadingEmoji = client.emojis.resolve('783028992231866419');

  if (userInfo == undefined) await client.createGuildUser(message.guild, message.member);

  const lastD = userInfo.cd.daily;
  if (lastD !== null && dailyCd - (Date.now() - lastD) > 0) {
    const cdT = dailyCd - (Date.now() - lastD);
    const cdEmbed = new MessageEmbed()
      .setTitle('Daily Cooldown')
      .setDescription(`You have to wait ${Math.floor(cdT / (1000 * 60 * 60) % 24)}h, ${Math.floor(cdT / (1000 * 60) % 60)}m and ${Math.floor(cdT / (1000) % 24)}s before next daily rewards!`)
      .setFooter(message.author.tag, message.author.avatarURL())
      .setTimestamp();
    message.reply(cdEmbed);
  } else {
    const embed = new MessageEmbed()
      .setAuthor(message.author.tag, message.author.avatarURL())
      .setColor('#000000')
      .setTitle('Daily Spin')
      .setDescription(`Please wait${loadingEmoji}`)
      .setTimestamp();

    const emojis = [{
      name: '🍌',
      prix: 100
    }, {
      name: '🍌',
      prix: 100
    }, {
      name: '🍌',
      prix: 100
    }, {
      name: '🍏',
      prix: 200
    }, {
      name: '🍌',
      prix: 100
    }, {
      name: '🍏',
      prix: 200
    }, {
      name: '🍌',
      prix: 100
    }, {
      name: '🍌',
      prix: 100
    }, {
      name: '🍒',
      prix: 500
    }, {
      name: '🍏',
      prix: 200
    }, {
      name: '🍌',
      prix: 100
    }, {
      name: '🍌',
      prix: 100
    }, {
      name: '🍌',
      prix: 100
    }, {
      name: '🍐',
      prix: 300
    }, {
      name: '🍐',
      prix: 300
    }, {
      name: '🍊',
      prix: 400
    }, {
      name: '🍏',
      prix: 200
    }, {
      name: '🍌',
      prix: 100
    }, {
      name: '🍐',
      prix: 300
    }, {
      name: '🍊',
      prix: 400
    }, ]
    let rdm1 = emojis[Math.round(Math.random() * 19)],
      rdm2 = emojis[Math.round(Math.random() * 19)],
      rdm3 = emojis[Math.round(Math.random() * 19)];

    message.channel.send(embed).then(async msg => {
      await embed.setDescription('')
      await embed.addField(rdm1.name, rdm1.prix, true)
      await msg.edit(embed)

      await embed.addField(rdm2.name, rdm2.prix, true)
      await msg.edit(embed);

      await embed.addField(rdm3.name, rdm3.prix, true)
      await msg.edit(embed);


      if (embed.fields[0].name == embed.fields[1].name == embed.fields[2].name) {
        embed.setFooter(`$${parseInt(embed.fields[0].value) * 10}`);
      } else if (embed.fields[0].name !== embed.fields[1].name == embed.fields[2].name) {
        embed.setFooter(`$${(parseInt(embed.fields[1].value) * 3)}`);
      } else if (embed.fields[0].name == embed.fields[1].name !== embed.fields[2].name) {
        embed.setFooter(`$${(parseInt(embed.fields[1].value) * 3)}`);
      } else if (embed.fields[0].name == embed.fields[2].name !== embed.fields[1].name) {
        embed.setFooter(`$${(parseInt(embed.fields[2].value) * 3)}`);
      } else if (embed.fields[0].name !== embed.fields[1].name !== embed.fields[2].name) {
        embed.setFooter(`$${100}`);
      }

      const nbWin = parseInt(embed.footer.text.slice(1))
      const newB = userInfo.moneyCash + nbWin;

      await embed.setDescription(`You won $${nbWin} for daily spin ! You have now $${newB} on your hand !`);
      await msg.edit(embed)

      client.updateGuildUI(message.guild, message.member, {
        "users.$.moneyCash": newB
      });
      client.updateGuildUI(message.guild, message.member, {
        "users.$.cd.daily": Date.now()
      });
    })

  };
};



module.exports.help = MESSAGES.COMMANDS.ECONOMY.DAILY;