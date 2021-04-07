import {
    CategoryChannel,
    EmojiResolvable,
    Guild,
    RoleResolvable,
    TextChannel,
    VoiceChannel,
  } from 'discord.js';
  
  /**
   * Create a backup in database
   * @param {Object} backup
   */
  export declare function createBackup(backup: Object);
  /**
   * Update the created backup in database
   * @param {Object} backup
   */
  export declare function newBackup(backup: Object);
  /**
   * Return a backup info
   * @param {String} code
   * @returns {Object}
   */
  export declare function getBackup(code: String);
  /**
   * Delete a backup from the database
   * @param {String} code
   */
  export declare function deleteBackup(code: String);
  /**
   * Fetch roles from a guild
   * @param {Guild} guild
   * @returns {Array}
   */
  export declare function fetchRoles(guild: Guild): RoleResolvable[];
  /**
   * Fetch categorys from a guild with their children
   * @param {Guild} guild 
   * @returns {Array}
   */
  export declare function fetchCategorys(guild: Guild): CategoryChannel[];
  /**
   * Fetch emojis from a guild
   * @param guild
   * @returns {Array}
   */
  export declare function fetchEmojis(guild: Guild): EmojiResolvable[];
  
  /**
   * Fetch the text channels without categorys
   * @param guild
   * @returns {Array}
   */
  export declare function fetchTextChannels(guild: Guild): TextChannel[];
  /**
   * Fetch the voice channels without categorys
   * @param guild
   * @returns {Array}
   */
  export declare function fetchVoiceChannels(guild: Guild): VoiceChannel[];
  /**
   * Delete all roles and channels from the guild before load backup
   * @param guild 
   */
  export declare function clearGuild(guild: Guild);
  /**
   * Load emojis from a backup
   * @param {Guild}
   * @param {Backup}
   */
  export declare function loadEmojis(guild: Guild, backup: any);
  /**
   * Load roles from a backup
   * @param guild 
   * @param backup 
   */
  export declare function loadRoles(guild: Guild, backup: any);
  /**
   * Load categorys from a backup
   * @param guild 
   * @param backup 
   */
  export declare function loadCategorys(guild: Guild, backup: any);
  /**
   * Load channels without categorys from a backup
   * @param guild 
   * @param backup 
   */
  export declare function loadOthersChannels(guild: Guild, backup: any);