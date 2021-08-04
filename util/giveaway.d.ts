import {
    Snowflake,
    Guild,
    Role,
    Channel,
    User
  } from 'discord.js';

  /**
   * Create a giveaway.
   * @param guild 
   * @param giveaway 
   */
  export declare function createGiveaway(guild: Guild, giveaway: Giveaway);
  /**
   * Restart a giveaway
   * @param guild 
   * @param giveaway 
   */
  export declare function restartGiveaway(guild: Guild, giveaway: Giveaway);
  /**
   * Fetch a giveaway
   * @param guild 
   * @param ID 
   */
  export declare function getGiveaway(guild: Guild, ID: Snowflake);
  /**
   * End a giveaway
   * @param guild 
   * @param ID 
   */
  export declare function endGiveaway(guild: Guild, giveaway: Giveaway);
  /**
   * Edit a giveaway
   * @param guild 
   * @param giveaway 
   */
  export declare function editGiveaway(guild: Guild, giveaway: Giveaway, options: Object);
  /**
   * Delete a giveaway from the database
   * @param guild 
   * @param ID 
   */
  export declare function deleteGiveaway(guild: Guild, ID: Snowflake);

  export declare class Giveaway {
    constructor (GiveawayData: GiveawayData);
    public id: Snowflake;
    public author: Snowflake;
    public startedAt: Number;
    public endedAt: Number;
    public time: Number;
    public remaining: Number;
    public winnerCount: Number;
    public winners: User[];
    public channel: Channel;
    public price: String;
    public status: String;
    public blackListRoles: Role[];
    public whiteListRoles: Role[];
  }
  
  export interface GiveawayData {
    id: Snowflake;
    author: Snowflake;
    startedAt: Number;
    endedAt: Number;
    time: Number;
    remaining: Number;
    winnerCount: Number;
    winners: User[];
    channel: Channel;
    price: String;
    status: String;
    blackListRoles: Role[];
    whiteListRoles: Role[];
  }