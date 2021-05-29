const {
  MessageEmbed
} = require('discord.js');
const moment = require('moment');
const {
  MESSAGES
} = require('../../../util/constants');
const functions = require('../../../util/functions');

module.exports.run = functions.run = async (client, message, args, settings, userInfo, strings) => {

  const dailyCd = 8.64e+7;
  const language = settings.general.language;
  const loadingEmoji = client.emojis.resolve(client.localEmojis.loadingEmoji);
  const logoEmoji = client.emojis.resolve(client.localEmojis.logo);
  if (userInfo == undefined) await client.createGuildUser(message.guild, message.member);

  const lastD = userInfo.cd.daily;
  if (lastD !== null && dailyCd - (Date.now() - lastD) > 0) {
    const cdT = dailyCd - (Date.now() - lastD);
    const cdEmbed = new MessageEmbed()
      .setTitle(language == 'fr' ? 'Cooldown' : 'Cooldown')
      .setDescription(language == 'fr' ? `Tu dois attendre ${Math.floor(cdT / (1000 * 60 * 60) % 24)}h, ${Math.floor(cdT / (1000 * 60) % 60)}m and ${Math.floor(cdT / (1000) % 24)}s avant la prochaine récompense !` : `You have to wait ${Math.floor(cdT / (1000 * 60 * 60) % 24)}h, ${Math.floor(cdT / (1000 * 60) % 60)}m and ${Math.floor(cdT / (1000) % 24)}s before next daily rewards !`)
      .setFooter(message.author.tag, message.author.avatarURL())
      .setTimestamp();
    message.reply(cdEmbed);
  } else {
    const embed = new MessageEmbed()
      .setAuthor(message.author.tag, message.author.avatarURL())
      .setColor('#000000')
      .setTitle('Daily Spin')
      .setDescription(language == 'fr' ? `Veuillez patienter${loadingEmoji}` : `Please wait${loadingEmoji}`)
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


      // if (embed.fields[0].name == embed.fields[1].name == embed.fields[2].name) {
      //   embed.setFooter(`$${parseInt(embed.fields[0].value) * 10}`);
      // } else if (embed.fields[0].name !== embed.fields[1].name == embed.fields[2].name) {
      //   embed.setFooter(`$${(parseInt(embed.fields[1].value) * 3)}`);
      // } else if (embed.fields[0].name == embed.fields[1].name !== embed.fields[2].name) {
      //   embed.setFooter(`$${(parseInt(embed.fields[1].value) * 3)}`);
      // } else if (embed.fields[0].name == embed.fields[2].name !== embed.fields[1].name) {
      //   embed.setFooter(`$${(parseInt(embed.fields[2].value) * 3)}`);
      // } else if (embed.fields[0].name !== embed.fields[1].name !== embed.fields[2].name) {
      //   embed.setFooter(`$${100}`);
      // }

      embed.setFooter(`$${(parseInt(embed.fields[1].value) + parseInt(embed.fields[2].value) + parseInt(embed.fields[0].value))}`)

      const nbWin = parseInt(embed.footer.text.slice(1))
      const newB = userInfo.moneyCash + nbWin;
      let description = language == 'fr' ? `\`\`\`javascript\nVous avez gagné $${nbWin} pour la récompense quotidienne ! Vous avez maintenant $${newB} dans votre \`cash\` balance !\`\`\`` : `\`\`\`javascript\nYou won $${nbWin} for daily reward ! You have now $${newB} on your hand !\`\`\``;

      const user = await client.getUser(message.author);
      await creditSystem(user);
      /**
       * 
       * @param {functions.UserData} user 
       */
      async function creditSystem(user) {
        if (!user) user = await client.createUser({
          userID: message.author.id,
          avatar: message.author.avatar,
          guilds: [],
          tag: message.author.tag
        })

        const currentCredits = user.noctCredits.total;
        const date = user.noctCredits.dateToday;
        const daily = user.noctCredits.daily;
        const currentDate = moment(Date.now()).format("DD/MM/YY")
        const newCredits = currentCredits + 10;

        if (currentDate !== date) await client.updateUser(message.author, {
          "noctCredits.dateToday": currentDate,
          "noctCredits.daily.cooldown": false,
          "noctCredits.hourly.cooldown": false,
          "noctCredits.daily.usedToday": 0,
          "noctCredits.hourly.usedToday": 0,
        });
        const dtFormat = moment(Date.now()).format("HH:mm:SS")
        if (daily.usedToday >= daily.limitIfNoVote) {
          if (daily.usedToday >= daily.limitIfNoVote && (moment(user.lastVoteTS).format("YY") !== moment(Date.now()).format("YY") || moment(user.lastVoteTS).format("MM") !== moment(Date.now()).format("MM") || moment(user.lastVoteTS).format("DD") !== moment(Date.now()).format("DD"))) return;
          else if (daily.usedToday >= daily.maxUsesPerDay) return;
        };
        if (daily.cooldown) {
          if ((daily.usedToday + 1) < daily.maxUsesPerDay) description += `\nYou have 10 ${logoEmoji}credits awaiting you ! To claim it, **use daily command in another server !\n If you don't have ${client.user.username} on another server, you can [add me](${client.botGuild.supportInvite}) !**`, await client.updateUser(message.author, {
            "noctCredits.daily.cooldown": false, "noctCredits.daily.usedToday": (user.noctCredits.daily.usedToday + 1)
          });
          else description+=`\nYou have reached ${logoEmoji}credits limit per day ! \nYou can come back in ${24 - parseInt(dtFormat.slice(0, 2))}h:${60 - parseInt(dtFormat.slice(4, 6))}m:${60 - parseInt(dtFormat.slice(8, 10))}, **use daily command in another server !\n If you don't have ${client.user.username} on another server, you can [add me](${client.botGuild.supportInvite}) !**`;
        } else {
            if (daily.usedToday < daily.maxUsesPerDay) description+=`\n\`\`\`javascript\nYou've got 10 credits, you have now ${newCredits} credits (${2000 - newCredits} left to get ${client.user.username}'s premium) !\`\`\``, await client.updateUser(message.author, {
              "noctCredits.total": newCredits, 
              "noctCredits.daily.cooldown": true,
              "noctCredits.daily.usedToday": user.noctCredits.daily.usedToday
            });
          }
      }
      await embed.setDescription(description);
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