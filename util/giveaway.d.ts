import {
    Snowflake,
    Guild
  } from "discord.js";
import { Giveaway } from "./util";

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
  export declare function endGiveaway(guild: Guild, ID: Snowflake);
  /**
   * Edit a giveaway
   * @param guild 
   * @param giveaway 
   */
  export declare function editGiveaway(guild: Guild, giveaway: Giveaway);
  /**
   * Delete a giveaway from the database
   * @param guild 
   * @param ID 
   */
  export declare function deleteGiveaway(guild: Guild, ID: Snowflake);