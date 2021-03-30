
export declare function fetchURL(url: String);

export declare function getPlayer(tag: String): Promise<Player>;

export declare function getPlayerBattles(playerTag: string): Promise<PlayerBattles>;

export declare function getClub(clubTag: string): Promise<Club>;

export declare function getClubMembers(clubTag: string): Promise<ClubMembers>;

export declare function getBrawlers(): Promise<Brawlers>;

export declare function getBrawler(brawlerId: string | number): Promise<Brawler>;

export declare function getClubRankings(countryCode?: string, options?: SearchOptions): Promise<ClubRankings>;

export declare function getPlayerRankings(countryCode?: string, options?: SearchOptions): Promise<Rankings>;

export declare function getBrawlerRanking(brawlerId: string | number, countryCode?: string, options?: SearchOptions): Promise<Rankings>;

export declare function getPowerPlayRankings(seasonId: string, countryCode?: string, options?: SearchOptions): Promise<Rankings>;

export declare function getPowerPlaySeasons(countryCode?: string, options?: SearchOptions): Promise<Seasons>;

export interface Player {
    icon: {
        id: number;
    };
    tag: string;
    name: string;
    nameColor: string;
    trophies: number;
    expLevel: number;
    expPoints: number;
    highestTrophies: number;
    powerPlayPoints: number;
    highestPowerPlayPoints: number;
    soloVictories: number;
    duoVictories: number;
    '3vs3Victories': number;
    bestRoboRumbleTime: number;
    bestTimeAsBigBrawler: number;
    isQualifiedFromChampionshipChallenge: boolean;
    club?: {
        tag: string;
        name: string;
    };
    brawlers: {
        id: number;
        rank: number;
        trophies: number;
        highestTrophies: number;
        power: number;
        name: string;
        starPowers: SPGadget[];
        gadgets: SPGadget[];
    }[];
    response: Response;
}
export interface PlayerBattle {
    battleTime: string;
    event: {
        id: number;
        mode: string;
        map: string;
    };
    battle: {
        mode: string;
        type: string;
        result: string;
        duration?: number;
        trophyChange?: number;
        starPlayer?: {
            tag: string;
            name: string;
            brawler: {
                id: number;
                name: string;
                power: number;
                trophies: number;
            };
        };
        teams: any;
    };
}
export interface PlayerBattles {
    items: PlayerBattle[];
    response: Response;
}
export interface ClubMembers {
    items: ClubMember[];
    response: Response;
}
export interface Club {
    tag: string;
    name: string;
    description: string;
    trophies: number;
    requiredTrophies: number;
    type: string;
    badgeId: number;
    members: ClubMember[];
    response: Response;
}
export interface Brawlers {
    items: Brawler[];
    response: Response;
}
export interface Brawler {
    name: string;
    id: number;
    starPowers: SPGadget[];
    gadgest: SPGadget[];
    response: Response;
}
export interface Rankings {
    items: {
        club?: {
            name: string;
        };
        icons: {
            id: number;
        };
        tag: string;
        name: string;
        rank: number;
        trophies: number;
        nameColor: string;
    }[];
    response: Response;
}
export interface ClubRankings {
    items: {
        tag: string;
        name: string;
        trophies: number;
        rank: number;
        memberCount: number;
        badgeId: number;
    }[];
    response: Response;
}
export interface Seasons {
    items: {
        id: string;
        startTime: string;
        endTime: string;
    }[];
    response: Response;
}
interface Response {
    status: number;
    ok: boolean;
}
interface SPGadget {
    id: number;
    name: string;
}
interface ClubMember {
    icon: {
        id: number;
    };
    tag: string;
    name: string;
    trophies: string;
    role: string;
    nameColor: string;
}
export {};

interface SearchOptions {
    limit: number;
    before: string;
    after: string;
}