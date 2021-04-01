const chalk = require("chalk");
const {
  MessageEmbed,
  APIMessage
} = require("discord.js");
const {
  response
} = require("express");
const functions = require('../../../util/functions')

module.exports = functions.client = async client => {
  const guilds = [];
  client.guilds.cache.map(e => guilds.push(e));
  guilds.forEach(async g => {
    const data = await client.getGuild(g);
    if (data === undefined) client.createGuild({
      guildID: g.id
    });
    g.members.fetch().then()
  });

  console.log(
    chalk.bgWhite.black(`${client.user.tag} est prêt alhamduliLlah ! ${guilds.length} serveurs, ${client.users.cache.size} membres!`)
  );

  let activities = ["~help or ping me", `${client.users.cache.size} members in ${guilds.length} servers !`],
    i = 0,
    presence = ['LISTENING', 'WATCHING'],
    j = 0;

  setInterval(
    () =>
    client.user.setPresence({
      activity: {
        name: `${activities[i++ % activities.length]}`,
        type: `${presence[j++ % presence.length]}`,
      },
    }),
    7000
  );



  const getApp = guildID => {
    const app = client.api.applications(client.user.id)
    if (guildID) {
      app.guilds(guildID)
    }
    return app;
  }


  guilds.forEach(async g => {
    try {
      const commands = await getApp(g.id).commands.get().catch(err => {});
      
      if (!commands.map(d => d.name).includes('ping')) {
        await getApp(g.id).commands.post({
          data: {
            name: 'ping',
            description: 'A simple ping command',
          }
        }).catch(() => {})
      } 
      if (!commands.map(d => d.name).includes('embed')) {
        await getApp(g.id).commands.post({
          data: {
            name: 'embed',
            description: 'Displays an embed',
            options: [{
                name: 'Description',
                description: 'Embed Description',
                required: true,
                type: 3
              },
              {
                name: 'Color',
                description: 'Embed Color',
                required: true,
                type: 3
              },
              {
                name: 'Message',
                description: 'Normal Message',
                required: false,
                type: 3
              },
              {
                name: 'Title',
                description: 'Embed Title',
                required: false,
                type: 3
              },
              {
                name: 'TitleURL',
                description: 'Embed Title URL',
                required: false,
                type: 3
              },
              {
                name: 'Author',
                description: 'Embed Author Text',
                required: false,
                type: 3
              },
              {
                name: 'AuthorIcon',
                description: 'Embed Author Icon',
                required: false,
                type: 3
              },
              {
                name: 'AuthorURL',
                description: 'Embed Author URL',
                required: false,
                type: 3
              },
              {
                name: 'Thumbnail',
                description: 'Embed Thumbnail',
                required: false,
                type: 3
              },
              {
                name: 'Image',
                description: 'Embed Image',
                required: false,
                type: 3
              },
              {
                name: 'FooterText',
                description: 'Embed Footer Text',
                required: false,
                type: 3
              },
              {
                name: 'FooterIcon',
                description: 'Embed Footer Icon',
                required: false,
                type: 3
              },
            ]
          }
        }).catch(() => {})
      }


      client.ws.on('INTERACTION_CREATE', async (interaction) => {
        try {
          const {
            name,
            options
          } = interaction.data

          const command = name.toLowerCase();

          const args = {};

          if (options) {
            for (const option of options) {
              const {
                name,
                value
              } = option;
              args[name] = value
            }
          }

          if (command == 'ping') {
            reply(interaction, `Pong - ${client.ws.ping}ms`)
          } else if (command == 'embed') {
            let msg = '';
            const embed = new MessageEmbed()

            for (let arg in args) {
              const value = args[arg]

              arg = arg.toLowerCase();
              arg == 'title' ? await embed.setTitle(value) : ''
              arg == 'titleurl' ? await embed.setURL(value) : ''
              arg == 'author' ? await embed.setAuthor(value) : ''
              arg == 'authoricon' ? await embed.setAuthor(embed.author.name, value) : ''
              arg == 'authorurl' ? await embed.setAuthor(embed.author.name, embed.author.url, value) : ''
              arg == 'description' ? await embed.setDescription(value.toString().split("/n").join('\n')) : ''
              arg == 'thumbnail' ? await embed.setThumbnail(value) : ''
              arg == 'image' ? await embed.setImage(value) : ''
              arg == 'color' ? await embed.setColor(value ? value : 'RANDOM') : ''
              arg == 'fottertext' ? await embed.setFooter(value) : ''
              arg == 'footericon' ? await embed.setFooter(embed.footer.text, value) : ''
              arg == 'message' ? msg = value : ''
            }
            await reply(interaction, embed);
          }
        } catch (e) {}
      })

      const reply = async (interaction, res) => {
        try {
          let data = {
            content: res,
          }

          if (typeof response === 'object') {
            data = await createAPIMessage(interaction, res)
          }

          client.api.interactions(interaction.id, interaction.token).callback.post({
            data: {
              type: 4,
              data
            }
          })
        } catch (e) {}
      }

      const createAPIMessage = async (interaction, content) => {
        try {
          const {
            data,
            files
          } = await APIMessage.create(
            client.channels.resolve(interaction.channel_id),
            content
          ).resolveData().resolveFiles();

          return {
            ...data,
            files
          }
        } catch (e) {}
      }
    } catch (e) {
    }
  })
};