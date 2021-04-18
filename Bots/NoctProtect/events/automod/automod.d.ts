import * as Discord from 'discord.js';
import { GuildData, UserData } from '../../util/functions'

export declare interface AutomodOpt {
  client: Discord.Client;
  message: Discord.Message;
  args: String[];
  type: 'link' | 'invite' | 'uppercase' | 'emojis' | 'spam' | 'zalgo' | 'mentions' | 'warn-limit' | 'mute-limit';
  settings: GuildData;
  userInfo: UserData
}
