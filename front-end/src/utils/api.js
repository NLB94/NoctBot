import axios from 'axios';
import * as fetch from 'node-fetch'

export const getUserDetails = () => axios.get('http://localhost/api/auth/user', {
  withCredentials: true
});

export const getAvatarUrl = (guildID, hash) => `https://cdn.discordapp.com/icons/${guildID}/${hash}.png`

export const getGuildRoles = (guildID) => axios.get(
  `http://localhost/api/discord/guilds/${guildID}/roles`, {
    withCredentials: true
  },
);

export const getGuildChannels = (guildID) => axios.get(
  `http://localhost/api/discord/guilds/${guildID}/channels`, {
    withCredentials: true
  },
);

export const getGuildData = (guildID) => axios.get(
  `http://localhost/api/discord/guilds/${guildID}`, {
    withCredentials: true
  }
);

export const postGuildPrefix = (guildID, prefix) => axios.post(
  `http://localhost/api/discord/guilds/${guildID}/prefix`, {
    prefix
  }, {
    withCredentials: true
  },
);

export const postGuildLogging = (guildID, data) => axios.patch(
  `http://localhost/api/discord/guilds/${guildID}/logging`,
  data, {
    withCredentials: true
  },
);

export const getBotGuilds = async () => {
  const response = await fetch('https://discord.com/api/v6/users/@me/guilds', {
    method: 'GET',
    headers: {
      Authorization: `Bot ${process.env.TOKEN}`
    }
  })
  return response.json()
}