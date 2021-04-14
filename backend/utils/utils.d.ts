import { Guild, GuildFeatures } from "discord.js";

export declare function getMutualGuilds(userGuilds: UserGuild[], botGuilds: Guild[]): UserGuild[];

export declare interface UserGuild {
    id: String;
    name: String;
    icon: String;
    owner: Boolean;
    permissions: Number;
    features: [GuildFeatures]
    permissions_new: String;
}