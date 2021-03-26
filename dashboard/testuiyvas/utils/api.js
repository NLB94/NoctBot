import axios from 'axios';

export const getUserDetails = () => axios.get('http://localhost/api/auth', { withCredentials: true });

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
  `http://localhost/api/discord/guilds/${guildID}/prefix`,
  { prefix },
  { withCredentials: true },
);

export const postGuildLogging = ( guildID, data ) => axios.patch(
  `http://localhost/api/discord/guilds/${ guildID }/logging`,
  data,
  { withCredentials: true },
);
