import { gql } from '@apollo/client';

export const getGuildConfigQuery = gql`
  query User($guildID: String!) {
    getMutualGuilds {
      name
      id
    }
    getUserDetails {
      username
      discordId
      discriminator
      avatar
    }
    getRoles(guildID: $guildID) {
      name
      id
    }
    getGuildConfig(guildID: $guildID) {
      prefix
      guildID
      defaultRole
    }
    getChannels(guildID: $guildID) {
      name
      id
    }
  }
`;

export const getUserDetails = gql`
  query getUserDetails {
    username
    discordId
    discriminator
    avatar
    roles
  }
`;